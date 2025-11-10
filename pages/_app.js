import '../styles.css'
import { useRouter } from 'next/router'
import en from '../locales/en.json'
import es from '../locales/es.json'

function MyApp({ Component, pageProps }) {
  const { locale } = useRouter()
  const t = locale === 'en' ? en : es
  return <Component {...pageProps} t={t} />
}

export default MyApp
