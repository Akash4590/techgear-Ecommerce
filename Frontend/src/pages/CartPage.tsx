import React from 'react'
import Navbar from '../components/Navbar'
import CartBreadcrumb from '../components/cart/Cartbreadcrumb'
import CartContent from '../components/cart/Cartcontent'
import FeatureBar from '../components/product-details/FeatureBar'
import Footer from '../components/Footer'

const CartPage = () => {
  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <CartBreadcrumb />

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="text-gray-500 mt-1">2 Items in your cart</p>
        </div>

        <CartContent />

        <div className="mt-8">
          <FeatureBar />
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default CartPage