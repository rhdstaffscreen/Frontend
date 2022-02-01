import '../styles/globals.css'
import '../styles/fun.css'
import Footer from '../Components/Footer'

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Component {...pageProps} />
      <Footer />
    </div>
  )
}

export default MyApp
