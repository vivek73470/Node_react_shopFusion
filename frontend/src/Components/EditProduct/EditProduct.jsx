import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { editProducts, getSingleProduct } from '../../Redux/products/action';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

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
    useEffect(() => {
        if (id) {
            dispatch(getSingleProduct(id))
        }
    }, [dispatch, id]);

    useEffect(() => {
        if (editproduct) {
            setData(editproduct);
        }
    }, [setData, editproduct]);

    const handleChange = (e) => {
        setData((prevdata) => ({
            ...prevdata,
            [e.target.name]: e.target.value
        }))

    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await dispatch(editProducts(id, data))
            if (response.status) {
                navigate('/admin')
                toast("updated Successfully!");
            }
            else {
                toast("updation failed!");
            }
        } catch (e) {
            console.log(e)
        }
    }

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
                        <input
                            name='image'
                            type="text"
                            className='addproduct-input'
                            id="title"
                            placeholder=" enter image url"
                            value={data.image}
                            onChange={handleChange}
                        />
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
                    <button className='addproduct-button' >Update</button>
                </form>
            </div>

        </>
    )
}

export default EditProduct