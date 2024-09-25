import React from 'react'
import './checkout.css'
import Modal from 'react-modal';
import { useState } from 'react';


function Checkout({ cart, checkoutHandler }) {

    const handleConfirmOrders = () => {
        checkoutHandler();

    };
    return (
        <>
            <div className='checkout-container-parent'>
                {cart.length > 0 && (
                    <button className='checkout-btn' data-bs-toggle="modal" data-bs-target="#staticBackdrop">Checkout</button>
                )}

                <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
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
                                    <button className='check-cnfm-ordr' data-bs-dismiss="modal" onClick={handleConfirmOrders}>Confirm Orders</button>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary">Understood</button>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </>
    )
}

export default Checkout