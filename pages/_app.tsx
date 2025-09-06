import type { AppProps } from 'next/app'
import TopNav from '../components/TopNav'
import { AuthProvider } from '../context/AuthContext'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <TopNav />
      <Component {...pageProps} />
    </AuthProvider>
  )
}
