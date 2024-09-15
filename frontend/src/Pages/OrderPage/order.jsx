import React, { useEffect } from 'react';
import './order.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteOrderProducts, fetchOrder } from '../../Redux/products/action';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/footer';

function Order() {
    const dispatch = useDispatch();
    const orders = useSelector((store) => store.ProductReducer.orders);


    useEffect(() => {
        dispatch(fetchOrder());
    }, [dispatch]);

    const removeOrder = (id) => {
        dispatch(deleteOrderProducts(id))
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
                                                    <h2 style={{ textAlign: 'center', padding: '4px' }}>{elem.title}</h2>
                                                    <p className='order-description'>{elem.description}</p>
                                                    <p className='cart-add-price-order'>रु.{elem.price}</p>
                                                    <button onClick={() => removeOrder(elem.id)} className='rmv-btn'>Cancel Order  </button>
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
