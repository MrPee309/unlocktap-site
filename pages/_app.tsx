import type { AppProps } from 'next/app';
import '../styles/globals.css';
import { AuthProvider } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import PromoTicker from '../components/PromoTicker';
import HeroSlider from '../components/HeroSlider';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Navbar />
      <PromoTicker />
      <HeroSlider />
      <Component {...pageProps} />
    </AuthProvider>
  );
}
