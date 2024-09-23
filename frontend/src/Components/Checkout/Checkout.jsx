import React from 'react'
import './checkout.css'
import Modal from 'react-modal';
import { useState } from 'react';


function Checkout({ cart, checkoutHandler }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCheckout = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    const handleConfirmOrders = () => {
        checkoutHandler(); // Call the function to confirm orders
        setIsModalOpen(false); // Close the modal
    };
    return (
        <>
            <div className='checkout-container-parent'>
                {cart.length>0 &&(
                    <button className='checkout-btn' onClick={handleCheckout}>Checkout</button>
                )}
                <Modal 
                    isOpen={isModalOpen}
                    onRequestClose={handleCloseModal}
                    contentLabel="Checkout Modal"
                   >
                    <div className='parent-chck-btn'>
                        <h2 className='confirm-prch-ctr'>Confirm Purchase</h2>
                        <div className='checkout-inside-design'>
                        {cart.map((product) =>
                            <div className='checkout-max-ovr' key={product._id}>
                                <div className='checkout-imagels'>  <img src={product.image} alt="" /></div>
                                <p>{product.title}</p>
                            </div>
                        )}
                          </div>
                        <button className='check-cnfm-ordr' onClick={handleConfirmOrders}>Confirm Orders</button>
                    </div>
                </Modal>
            </div>
        </>
    )
}

export default Checkout