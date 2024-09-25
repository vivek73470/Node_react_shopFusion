import React from 'react'
import './cart.css'
import { MdDelete } from "react-icons/md";
import { useSelector, useDispatch } from 'react-redux';
import { addOrder, deleteProductCart } from '../../Redux/products/action';
import Checkout from '../../Components/Checkout/Checkout';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/footer';
import { toast } from 'react-toastify';


function Cart() {
  let cart = useSelector((store) => store.ProductReducer.cart)
  const dispatch = useDispatch();

  const removeProduct = async(id) => {
    const result = await dispatch(deleteProductCart(id));
    if(result.status) { 
       toast.success(result.message || 'Removed successfully');
    } else {
       toast.error(result.message || 'Error while removing product');
    }
 };
 
  const checkoutHandler = async () => {
    try {
        for (let i in cart) {
            const responseStatus = await dispatch(addOrder(cart[i]));
            if (responseStatus === 200) {
                toast.success(`Order for ${cart[i].title} added successfully!`);
            } else {
                toast.error(`Failed to add order for ${cart[i].title}.`);
            }
        }
    } catch (error) {
        toast.error("An error occurred during the checkout process.");
    }
};

  return (

    <>
      <Navbar />
      <div className='cart-design-screen'>
        <h2 className='cart-shopping-crt'>Shopping Cart</h2>
        {cart.length > 0 ? (
          <div className='cart-headinf style-4'>
            {cart.map((product) => (
              <CartItem
                key={product._id}
                _id={product._id}
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
      </div>
      <Footer />
    </>
  )
}

function CartItem({ _id, title, image, description, price, removeProduct }) {
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
              <button onClick={() => removeProduct(_id)} className='rmv-btn'>
                <MdDelete />   Remove  </button>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default Cart