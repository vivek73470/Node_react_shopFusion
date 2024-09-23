import React, { useEffect} from 'react'
import './singleDet.css'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { addProductCart, getSingleProduct } from '../../Redux/products/action';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/footer'
import { toast } from 'react-toastify';


function SingleProduct() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const currentProduct = useSelector(store => store.ProductReducer.CurrentProduct)



  useEffect(() => {
    if (id) {
      dispatch(getSingleProduct(id))
    }
  }, [dispatch, id])

  // Before dispatching the addProductCart action, it first checks if there is a currentProduct.
  //  This check ensures that the action is dispatched only if there is a valid product to add to the cart.
  const addToCartHandler = async () => {
    if (currentProduct) {
        const result = await dispatch(addProductCart(currentProduct)); 
        if (result.status) {
            toast.success("Added to cart Successfully!");
        } else {
            toast.error(result.message || 'An error occurred');
        }
    }
}


  return (
    <>
      <Navbar />
      <div className='single-product-mainscreen'>
        <div className='single-product-wrapscreen'>
          <div className='prdct-size-mobile' >
            <img src={currentProduct.image} alt='info_image' />
          </div>
          <div className='single-product-details'>
            <p className='single-product-fashion'>Fashion Store</p>
            <p className='single-product-men'>Gambling Problem Printed Premium Glass Cover For OnePlus 9RT (Impact Resistant, Matte Finish)</p>
            <div className='single-product-actdiscount'>
              <p className='single-product-discount'>रु.{currentProduct.discountedPriceText}</p>
              <p className='single-product-actual'>{currentProduct.actualPriceText}रु.</p>
              <div className='single-product-off'>
                <p>65</p>
                <p> %OFF</p>
              </div>
            </div>
            <div className='single-page-inclusive'>
              <p>
                inclusive of all taxes
              </p>
            </div>
            <div className='single-page-details'>
              <div className='single-product-1st'>
                <p>DESIGN OF THE DAY</p>
              </div>
              <div className='single-product-2nd'>
                <p>DESIGN OF THE DAY</p>

              </div>
            </div>
            <div>
              <p className='single-page-border'></p>
              <p className='single-page-tribe'>TriBe members get an extra discount of ₹40 and FREE shipping.</p>
              <p className='single-page-border'></p>
            </div>
            <div>
              <p className='single-product-select'> Select Size</p>
            </div>
            <div className='single-product-sizeflex'>
            </div>
            <div>
              <p className='single-product-garment'>Garment:Chest (in Inch):38.0 | Front Length (in Inch):27.25 | Sleeve Length (in Inch):8.0</p>
            </div>
            <div className='single-product-detail-box'>
              <p className='single-product-datail-head' >Product Details</p>
              <div>
                <p className='single-product-brand'>Brand:Burberry</p>
                <p className='single-product-brand'>Product Name: Men's White "The Ryuk" Graphic Printed T-shirt</p>
                <p className='single-product-brand'>Product Type: Full Sleeve T-shirt</p>
              </div>

            </div>
            <div className='single-product-description'>
              <p className='single-product-datail-head'>Description</p>
              <p>{currentProduct.description}</p>
            </div>
            <button className='single-addto-butn' onClick={addToCartHandler}>Add to Cart</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default SingleProduct