import Navbar from '../components/Navbar'
import OrdersBreadcrumb from '../components/orders/Ordersbreadcrumb'
import OrdersContent from '../components/orders/Orderscontent'
import Footer from '../components/Footer'

const OrdersPage = () => {
  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <OrdersBreadcrumb />

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
          <p className="text-gray-500 mt-1">
            Track and manage all your past orders.
          </p>
        </div>

        <OrdersContent />
      </div>

      <Footer />
    </div>
  )
}

export default OrdersPage