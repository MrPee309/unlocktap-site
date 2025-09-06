import type { AppProps } from 'next/app'
import TopNav from '../components/TopNav'
import { AuthProvider } from '../context/AuthContext'
import '../styles/globals.css' // if you don't have this file, remove the line

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <TopNav />
      <Component {...pageProps} />
    </AuthProvider>
  )
}
