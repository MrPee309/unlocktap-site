"use client"

import Link from "next/link"

export default function TopNav(){

return(

<header className="bg-white border-b">

<div className="max-w-7xl mx-auto flex justify-between items-center p-4">

<div className="flex gap-8">

{/* Reseller Pricing */}

<div className="relative group">

<button className="font-medium">
Reseller Pricing
</button>

<div className="absolute hidden group-hover:grid grid-cols-3 gap-6 bg-white shadow-lg p-6 w-[600px]">

<div>
<h4 className="font-bold mb-2">Unlock Services</h4>
<p>iPhone Unlock</p>
<p>Samsung Unlock</p>
<p>Xiaomi Unlock</p>
</div>

<div>
<h4 className="font-bold mb-2">Server Services</h4>
<p>FRP Remove</p>
<p>IMEI Repair</p>
<p>Network Unlock</p>
</div>

<div>
<h4 className="font-bold mb-2">Rent & Remote</h4>
<p>Remote GSM Tool</p>
<p>Remote Unlock</p>
<p>Remote Repair</p>
</div>

</div>

</div>

{/* Tutorials */}

<div className="relative group">

<button className="font-medium">
Tutorials
</button>

<div className="absolute hidden group-hover:grid grid-cols-3 gap-6 bg-white shadow-lg p-6 w-[600px]">

<div>
<h4 className="font-bold">Apple Tools</h4>
<p>iRemoval</p>
<p>iRemove</p>
<p>MacOS MDM Bypass</p>
</div>

<div>
<h4 className="font-bold">Android Tools</h4>
<p>HFZ</p>
<p>iKey</p>
<p>LPRO</p>
</div>

<div>
<h4 className="font-bold">Advanced</h4>
<p>MINA</p>
<p>SMD</p>
</div>

</div>

</div>

<Link href="/plans">Reseller Plans</Link>

<Link href="/terms">Terms</Link>

</div>

<div className="flex gap-4">

<Link href="/login">Login</Link>

<Link href="/register">Register</Link>

</div>

</div>

</header>

)

}