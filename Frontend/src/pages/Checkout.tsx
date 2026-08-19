import Navbar from '../components/Navbar'
import CheckoutBreadcrumb from '../components/checkout/Checkoutbreadcrumb'
import CheckoutContent from '../components/checkout/Checkoutcontent'
import Footer from '../components/Footer'

const CheckoutPage = () => {
  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <CheckoutBreadcrumb />

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          <p className="text-gray-500 mt-1">
            Complete your order by providing your details below.
          </p>
        </div>

        <CheckoutContent />
      </div>

      <Footer />
    </div>
  )
}

export default CheckoutPage
