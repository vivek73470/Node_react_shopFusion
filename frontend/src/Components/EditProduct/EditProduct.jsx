import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { editProducts, getSingleProduct } from '../../Redux/products/action';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { storage } from '../../firebase/firebase.config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

function EditProduct() {
    const navigate = useNavigate()
    const { id } = useParams();

    const dispatch = useDispatch();
    const editproduct = useSelector((store) => store.ProductReducer.CurrentProduct)


    const [data, setData] = React.useState({
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
    })

    const [imageFile, setImageFile] = useState(null); // Handle new image file upload
    const [previewImage, setPreviewImage] = useState(''); // Show the image preview


    useEffect(() => {
        if (id) {
            dispatch(getSingleProduct(id))
        }
    }, [dispatch, id]);

    useEffect(() => {
        if (editproduct) {
            setData(editproduct);
            setPreviewImage(editproduct.image);
        }
    }, [editproduct]);

    const handleChange = (e) => {
        setData((prevdata) => ({
            ...prevdata,
            [e.target.name]: e.target.value
        }))

    }

    // Handle image file selection
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file); // Set the selected file
        setPreviewImage(URL.createObjectURL(file)); // Show preview of selected image
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let updatedImageURL = data.image; // Default to existing image URL

            // If a new image is selected, upload it to Firebase
            if (imageFile) {
                const uniqueFileName = `${Date.now()}_${imageFile.name}`;
                const storageRef = ref(storage, `images/${uniqueFileName}`);

                // Upload the image file to Firebase
                const snapshot = await uploadBytes(storageRef, imageFile);

                // Get the download URL of the uploaded image
                updatedImageURL = await getDownloadURL(snapshot.ref);
            }

            // Prepare updated product data
            const updatedProductData = {
                ...data,
                image: updatedImageURL // Use the new image URL if a new image was uploaded
            };

            const response = await dispatch(editProducts(id, updatedProductData)); // Update product

            if (response.status) {
                navigate('/admin');
                toast.success("Product updated successfully!");
            } else {
                toast.error("Product update failed!");
            }
        } catch (e) {
            console.error(e);
            toast.error("An error occurred while updating the product.");
        }
    };


    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const response = await dispatch(editProducts(id, data))
    //         if (response.status) {
    //             navigate('/admin')
    //             toast.success("updated Successfully!");
    //         }
    //         else {
    //             toast.error("updation failed!");
    //         }
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }

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
                        >
                            <option value='' disabled>Select Category</option>
                            <option value="men's clothing">Men's Clothing</option>
                            <option value="women's clothing">Women's Clothing</option>
                            <option value="covers">Mobile Cover</option>

                        </select>

                        {/* Display Existing Image and Allow Click to Upload New Image */}
                        <div className='image-container'>
                            <img
                                src={previewImage}
                                alt="Product"
                                style={{ maxWidth: '150px', maxHeight: '150px', cursor: 'pointer' }}
                                onClick={() => document.getElementById('file-input').click()} // Trigger file input on click
                            />
                            <input
                                id='file-input'
                                name='image'
                                type="file"
                                className='addproduct-input'
                                style={{ display: 'none' }} // Hide the actual file input
                                onChange={handleFileChange}
                            />
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
                        />
                        <input
                            name='brand_namez'
                            type="text"
                            className='addproduct-input'
                            id="author"
                            placeholder="enter brand_namez"
                            value={data.brand_namez}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='add-admin-prd-rww'>
                        <input
                            name='plp'
                            type="text"
                            className='addproduct-input'
                            id="title"
                            placeholder="enter size "
                            value={data.plp}
                            onChange={handleChange}
                        />
                        <input
                            name='price'
                            type="text"
                            className='addproduct-input'
                            id="image"
                            placeholder=" enter price"
                            value={data.price}
                            onChange={handleChange}
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
                        />
                        <input
                            name='discount_price_box'
                            type="text"
                            className='addproduct-input'
                            id="image"
                            placeholder="enter discount_price_box"
                            value={data.discount_price_box}
                            onChange={handleChange}
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
                        />
                        <input
                            name='description'
                            type="text"
                            className='addproduct-input'
                            id="author"
                            placeholder="enter description"
                            value={data.description}
                            onChange={handleChange}
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
                    <button className='addproduct-button' >Update</button>
                </form>
            </div>

        </>
    )
}

export default EditProduct