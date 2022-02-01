import '../styles/globals.css'
import '../styles/fun.css'
import Footer from '../Components/Footer'
import Navbar from '../Components/Navbar'

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <div className="padding-bottom-50">
      <Navbar />
      </div>
      <Component {...pageProps} />
      <Footer />
    </div>
  )
}

export default MyApp
