import "@/styles/globals.css";
import TopBanners from "@/components/TopBanners";
import TopNav from "@/components/TopNav";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <TopBanners />
      <TopNav />
      <Component {...pageProps} />
    </>
  );
}