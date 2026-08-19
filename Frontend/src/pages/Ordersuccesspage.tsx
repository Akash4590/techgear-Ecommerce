import Navbar from '../components/Navbar'
import OrderSuccessBreadcrumb from '../components/ordersuccess/Ordersuccessbreadcrumb'
import OrderSuccessContent from '../components/ordersuccess/Ordersuccesscontent'
import Footer from '../components/Footer'

const OrderSuccessPage = () => {
  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <OrderSuccessBreadcrumb />
        <OrderSuccessContent />
      </div>

      <Footer />
    </div>
  )
}

export default OrderSuccessPage