
"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { dhruServiceList } from "../lib/dhruServiceList";
import Link from "next/link";

interface ServiceCategory {
  name: string;
  services: string[];
}

export default function SecondNav() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  // Filtre lis selon rechèch
  const filteredList = useMemo(() => {
    if (!searchTerm.trim()) return dhruServiceList;
    return dhruServiceList
      .map((category: ServiceCategory) => ({
        name: category.name,
        services: category.services.filter((s) =>
          s.toLowerCase().includes(searchTerm.toLowerCase())
        ),
      }))
      .filter((cat) => cat.services.length > 0);
  }, [searchTerm]);

  // Fèmen dropdown lè itilizatè klike deyò
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav
      className="bg-gray-50 border-b border-gray-200 px-4 py-2 shadow-sm"
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto flex items-center gap-4">
        {/* SEARCH BAR */}
        <input
          type="text"
          placeholder="Search service..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition"
        />

        {/* CATEGORIES */}
        {filteredList.map((category) => (
          <div key={category.name} className="relative">
            {/* BUTTON KI FÈ TOGGLE */}
            <button
              onClick={() =>
                setOpenDropdown(openDropdown === category.name ? null : category.name)
              }
              className="flex items-center gap-1 px-4 py-2 bg-white rounded-lg shadow hover:bg-blue-50 font-medium transition"
            >
              {category.name}
              <span
                className={`ml-1 transition-transform duration-200 ${
                  openDropdown === category.name ? "rotate-180" : "rotate-0"
                }`}
              >
                ▼
              </span>
            </button>

            {/* DROPDOWN */}
            {openDropdown === category.name && (
              <div className="absolute top-full left-0 mt-2 w-72 max-h-96 overflow-auto bg-white shadow-xl rounded-2xl z-50 p-3 border border-gray-200 transition-all duration-300">
                {category.services.map((service) => (
                  <div
                    key={service}
                    className="flex justify-between items-center px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    <span>{service}</span>
                  </div>
                ))}
                {/* BOUTON TOP-UP ACCOUNT SELMAN YON FOIS */}
                <Link
                  href={`/topup?category=${encodeURIComponent(category.name)}`}
                  className="block mt-3 w-full text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Top-Up Account
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
}
