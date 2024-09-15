import React from 'react'
import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import Home from '../../Pages/Homepage/Home'
import Products from '../../Pages/Products/Products'
import Cart from '../../Pages/Cart/Cart'
import CartCounter from '../CartCounter/CartCounter'
import Checkout from '../Checkout/Checkout'
import Order from '../../Pages/OrderPage/order'
import Login from '../../Pages/Login/login'
import Signup from '../../Pages/Signup/signup'
import AuthWrapper from '../AuthWrapper/authWrapper'
import Footer from '../Footer/footer'
import SingleProduct from '../../Pages/SingleProduct/Product'
import Contactus from '../../Pages/Contact/Contactus'
import NotFound from '../../Pages/NotFoundPage/NotFound'
import Dashboard from '../Dashboard/Dashboard'
import Admin from '../AdminPage/Admin'
import Sidebar from '../SidebarAdmin/Sidebar'
import AdminHeader from '../AdminHeader/AdminHeader'
import ProfileAd from '../AdminProfile/ProfileAd'
import AddProduct from '../AddProduct/AddProduct'
import EditProduct from '../EditProduct/EditProduct'
import CartAdmin from '../CartAdmin/CartAdmin'
import Forgot from '../ForgotScreen/Forgot'
import Password from '../PasswordChange/Password'



function AllRoutes() {
  return (
    <>
      <Routes>

        {/* user Routes */}
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<Products />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/cart-counter' element={<CartCounter />} />
        <Route path='/cartproducts/:id' element={<SingleProduct />} />
        <Route path='/check' element={<Checkout />} />
        <Route path='/orders' element={<Order />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forgot-password' element={<Forgot/>} />
        <Route path='/new-password' element={<Password/>} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/footer' element={<Footer />} />
        <Route path='/contact-us' element={<Contactus />} />
        <Route path='*' element={<NotFound />} />

        {/* Admin Routes */}
        <Route path='/admin' element={
          <AuthWrapper>
            <Admin />
          </AuthWrapper>}>
          <Route index element={<Dashboard />} />
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='sidebar' element={<Sidebar />} />
          <Route path='header' element={<AdminHeader />} />
          <Route path='profile' element={<ProfileAd />} />
          <Route path='cart-admin' element={<CartAdmin />} />
          <Route path='add-product' element={<AddProduct />} />
          <Route path='edit-product/:id' element={<EditProduct />} />

        </Route>


      </Routes>

    </>
  )
}

export default AllRoutes