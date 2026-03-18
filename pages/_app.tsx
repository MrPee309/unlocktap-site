import "@/styles/globals.css";
import TopBanners from "@/components/TopBanners";
import TopNav from "@/components/TopNav";
import SecondNav from "@/components/SecondNav"; // ✅ Ajoute sa

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <TopBanners />
      <TopNav />
      <SecondNav /> {/* ✅ Ajoute nav segondè la */}
      <Component {...pageProps} />
    </>
  );
}