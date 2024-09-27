import React from 'react'
import './index.css'
import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { addProducts } from '../../Redux/products/action';
import { toast } from 'react-toastify';
import { storage } from '../../firebase/firebase.config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

function Addproduct() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [data, setData] = useState({
    category: '',
    title: '',
    price: '',
    description: '',
    plp: '',
    brand_namez: '',
    discountedPriceText: '',
    actualPriceText: '',
    discount_price_box: '',
    image: '',
    filtercategory: '',
    size: '',
  })



  const handleChange = (e) => {
    setData((prevdata) => ({
      ...prevdata,
      [e.target.name]: e.target.value
    }))

  }

  // Handle image file selection and preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file); // Set the selected image file
    setPreviewImage(URL.createObjectURL(file)); // Create image preview URL
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageFile) {
      toast.error("Please select an image to upload!");
      return;
    }

    try {
      // step 1
      const uniqueFileName = `${Date.now()}_${imageFile.name}`;
      const storageRef = ref(storage, `images/${uniqueFileName}`);

      const snapshot = await uploadBytes(storageRef, imageFile); // Upload the image file
      const downloadURL = await getDownloadURL(snapshot.ref); // Get the download URL

      // Step 2: Add the download URL to product data
      const productData = {
        ...data,
        image: downloadURL // Save the Firebase Storage image URL to the product data
      };

      // Step 3: Dispatch the action to add the product
      const result = await dispatch(addProducts(productData));
      if (result.status) {
        navigate('/admin');
        toast.success("Product added successfully!");
      } else {
        toast.error("Error while adding product!");
      }

    } catch (error) {
      toast.error("Failed to upload image!");
      console.error("Error uploading image:", error);
    }
    // const result = await dispatch(addProducts(data));

  };


  return (
    <>
      <div className="container-addproduct">
        <h1 className='addproduct-title'>Add Products</h1>
        <form className='addproduct-form' onSubmit={handleSubmit}>
          <div className='add-admin-prd-rww'>
            <select
              name='category'
              className='addproduct-input-drp'
              value={data.category}
              onChange={handleChange}
              required
            >
              <option value='' disabled>Select Category</option>
              <option value="men's clothing">Men's Clothing</option>
              <option value="women's clothing">Women's Clothing</option>
              <option value="covers">Mobile Cover</option>

            </select>

            {/* Image Upload Div */}
            <div className="image-upload-wrapper">
              <input
                type="file"
                id="imageInput"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }} // Hide the actual file input
              />
              <div
                className="upload-box"
                onClick={() => document.getElementById('imageInput').click()} // Trigger file input on div click
              >
                {previewImage ? (
                  <img src={previewImage} alt="Preview" className="preview-image" />
                ) : (
                  <span className="upload-text">Upload Image</span>
                )}
              </div>
            </div>

          </div>


          <div className='add-admin-prd-rww'>
            <input
              name='title'
              type="text"
              className='addproduct-input'
              id="title"
              placeholder="enter title"
              value={data.title}
              onChange={handleChange}
              required
            />
            <input
              name='brand_namez'
              type="text"
              className='addproduct-input'
              id="author"
              placeholder="enter brand_namez"
              value={data.brand_namez}
              onChange={handleChange}
              required
            />
          </div>
          <div className='add-admin-prd-rww'>
            <input
              name='plp'
              type="text"
              className='addproduct-input'
              id="title"
              placeholder="enter plp "
              value={data.plp}
              onChange={handleChange}
              required
            />
            <input
              name='price'
              type="text"
              className='addproduct-input'
              id="image"
              placeholder=" enter price"
              value={data.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className='add-admin-prd-rww'>
            <input
              name='actualPriceText'
              type="text"
              className='addproduct-input'
              id="image"
              placeholder="enter actualPriceText"
              value={data.actualPriceText}
              onChange={handleChange}
              required
            />
            <input
              name='discount_price_box'
              type="text"
              className='addproduct-input'
              id="image"
              placeholder="enter discount_price_box"
              value={data.discount_price_box}
              onChange={handleChange}
              required
            />
          </div>
          <div className='add-admin-prd-rww'>
            <input
              name='discountedPriceText'
              type="text"
              className='addproduct-input'
              id="image"
              placeholder="enter discountedPriceText"
              value={data.discountedPriceText}
              onChange={handleChange}
              required
            />
            <input
              name='description'
              type="text"
              className='addproduct-input'
              id="author"
              placeholder="enter description"
              value={data.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className='add-admin-prd-rww'>
            <input
              name='filtercategory'
              type="text"
              className='addproduct-input'
              id="image"
              placeholder="enter filtercategory"
              value={data.filtercategory}
              onChange={handleChange}
              required
            />
            <input
              name='size'
              type="text"
              className='addproduct-input'
              id="author"
              placeholder="enter size"
              value={data.size}
              onChange={handleChange}
              required
            />
          </div>
          <button className='addproduct-button'>Submit</button>
        </form>
      </div>

    </>
  )
}

export default Addproduct