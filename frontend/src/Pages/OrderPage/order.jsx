import React, { useEffect } from 'react';
import './order.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteOrderProducts, fetchOrder } from '../../Redux/products/action';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/footer';
import { toast } from 'react-toastify';

function Order() {
    const dispatch = useDispatch();
    const orders = useSelector((store) => store.ProductReducer.orders);
  


    useEffect(() => {
        dispatch(fetchOrder());
    }, [dispatch]);

    const removeOrder = async(id) => {
       const result = await dispatch(deleteOrderProducts(id))
       if(result.status){
        toast.success(result.message || 'order cancel successfully');

       }else{
        toast.error(result.message || 'Error while cancel order');
       }
    }

    return (
        <>
            <Navbar />
            <div className='orderpage-container'>
                <div className='orderpage-wrapper'>
                    <h2>Your Orders</h2>
                    {orders.length > 0 ? (
                        <div className='order-scroll style-4'>
                            {orders.length > 0 &&
                                orders.map((elem, index) => (
                                    <div key={index}>
                                        <div className=''>
                                            <div className='orders-degn-flx '>
                                                <div className='cartitm-bdr-ims'>
                                                    <img src={elem.image} alt="" />
                                                </div>
                                                <div className='cartitm-bdr'>
                                                    <h2 style={{ textAlign: 'center', padding: '4px' }}>{elem.brand_namez}</h2>
                                                    <h2 style={{ textAlign: 'center', padding: '4px' }}>{elem.title} {elem.filtercategory}</h2>
                                                    <p className='order-description'>{elem.description}</p>
                                                    <p className='cart-add-price-order'>रु.{elem.price}</p>
                                                    <button onClick={() => removeOrder(elem._id)} className='rmv-btn'>Cancel Order  </button>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    ) : (
                        <p className='cart-nothing-item'>Nothing in your orders list.</p>
                    )}

                </div>
            </div>
            <Footer />
        </>
    );
}

export default Order;
