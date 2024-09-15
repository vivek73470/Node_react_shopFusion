import React from 'react'
import './cart.css'
import { MdDelete } from "react-icons/md";
import { useSelector, useDispatch } from 'react-redux';
import { addOrder, deleteProductCart } from '../../Redux/products/action';
import Checkout from '../../Components/Checkout/Checkout';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/footer';


function Cart() {
  let cart = useSelector((store) => store.ProductReducer.cart)
   
  const dispatch = useDispatch();
  const removeProduct = (id) => {
    dispatch(deleteProductCart(id))
  };

  const checkoutHandler = () => {
    for(let i in cart){
      dispatch(addOrder(cart[i]))

    }
  }

  return (

    <>
      <Navbar />
      <div className='cart-design-screen'>
        <h2 className='cart-shopping-crt'>Shopping Cart</h2>
        {/* <div className='cart-headinf style-4'>
          {cart.length && cart.map((product) => {
            return <CartItem
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              description={product.description}
              image={product.image}
              removeProduct={removeProduct}
            />
          })}
        </div> */}

{cart.length > 0 ? (
    <div className='cart-headinf style-4'>
      {cart.map((product) => (
        <CartItem
          key={product.id}
          id={product.id}
          title={product.title}
          price={product.price}
          description={product.description}
          image={product.image}
          removeProduct={removeProduct}
        />
      ))}
    </div>
  ) : (
    <p className='cart-nothing-item'>You have zero items in your cart.</p>
  )}
        <Checkout cart={cart} checkoutHandler={checkoutHandler} />
        {/* curly braces like {cart} passing a JavaScript expression as a prop, we can write anything inside curly braces and pass as a props */}
      </div>
      <Footer/>
    </>
  )
}

function CartItem({ id, title, image, description, price, removeProduct }) {
  return (
    <>

      <div className='cart-container'>
        <div className='cart-scrn-bdr'>
          <div className='cart-brdr'>
            <div className='cartitm-bdr-ims'>
              <img src={image} alt="" />
            </div>
            <div className='cartitm-bdr'>
              <h2>{title}</h2>
              <p>
                {description}
              </p>
              <p className='cart-add-price'>रु.{price}</p>
              <button onClick={() => removeProduct(id)} className='rmv-btn'>
                <MdDelete />   Remove  </button>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default Cart