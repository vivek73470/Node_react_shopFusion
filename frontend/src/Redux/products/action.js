import axios from 'axios';
import * as types from './actionType';
// import { type } from '@testing-library/user-event/dist/type';

const BASE_URL = process.env.REACT_APP_SERVER_URL;

// loader 
const startLoading = () => {
    return {
        type: types.START_LOADING
    }
}
const stopLoading = () => {
    return {
        type: types.STOP_LOADING
    }
}


// Fetch all products 
const fetchDataRequest = () => {
    return {
        type: types.FETCH_DATA_REQUEST,

    }
}
const fetchDataSuccess = (payload) => {
    return {
        type: types.FETCH_DATA_SUCCESS,
        payload,
    }
}
const fetchDataFailure = () => {
    return {
        type: types.FETCH_DATA_FAILURE,

    }
}
const fetchData = () => async (dispatch) => {
    dispatch(fetchDataRequest());
    try {
        const response = await axios.get(`${BASE_URL}/products`);
        dispatch(fetchDataSuccess(response.data.data));
    } catch (error) {
        dispatch(fetchDataFailure(error.message || 'Something went wrong'));
    }
};



// single page products 
const getSingleProductRequest = () => {
    return {
        type: types.GET_SINGLE_PRODUCT_REQUEST,

    }
}
const getSingleProductSuccess = (payload) => {
    return {
        type: types.GET_SINGLE_PRODUCT_SUCCESS,
        payload,
    }
}
const getSingleProductFailure = () => {
    return {
        type: types.GET_SINGLE_PRODUCT_FAILURE,

    }
}
const getSingleProduct = (id) => async (dispatch) => {
    dispatch(getSingleProductRequest())
    try {
        const response = await axios.get(`${BASE_URL}/products/${id}`)
        dispatch(getSingleProductSuccess(response.data.data))
    } catch (e) {
        dispatch(getSingleProductFailure(e.message))
    }
}


// Add product to cart
const addProductCartRequest = () => {
    return {
        type: types.ADD_PRODUCT_CART_REQUEST,

    }
}
const addProductCartSuccess = (payload) => {
    return {
        type: types.ADD_PRODUCT_CART_SUCCESS,
        payload,
    }
}
const addProductCartFailure = () => {
    return {
        type: types.ADD_PRODUCT_CART_FAILURE,

    }
}
const addProductCart = (prod) => async (dispatch) => {
    dispatch(addProductCartRequest());
    try {
        const response = await axios.post(`${BASE_URL}/cart/add`, prod);
        if (response.status === 200) {
            dispatch(addProductCartSuccess(response.data.data));
            return { status: true, code: 200 }
        } else {
            return { status: false, message: "Unexpected response from server." };
        }
    } catch (error) {
        console.error('Error adding product to cart:', error);
        dispatch(addProductCartFailure('Network error'));
        return { status: false, code: 500, message: 'An unexpected error occurred' };
    }
}


// total cart lengtt fetch 
const fetchCartRequest = () => {
    return {
        type: types.FETCH_CART_REQUEST,

    }
}
const fetchCartSuccess = (payload) => {
    console.log("crt fetch", payload)
    return {
        type: types.FETCH_CART_SUCCESS,
        payload,
    }
}
const fetchCartFailure = () => {
    return {
        type: types.FETCH_CART_FAILURE,

    }
}
const fetchCart = () => (dispatch) => {
    dispatch(fetchCartRequest());
    axios.get(`${BASE_URL}/cart`)
        .then(r => dispatch(fetchCartSuccess(r.data.data)))
        .catch(e => dispatch(fetchCartFailure(e.data)))

}

// delete product from cart
const deleteProductCartRequest = () => {
    return {
        type: types.REMOVE_PRODUCT_CART_REQUEST,

    }
}
const deleteProductCartSuccess = (payload) => {
    return {
        type: types.REMOVE_PRODUCT_CART_SUCCESS,
        payload,
    }
}
const deleteProductCartFailure = () => {
    return {
        type: types.REMOVE_PRODUCT_CART_FAILURE,

    }
}
const deleteProductCart = (id) => async (dispatch) => {
    dispatch(deleteProductCartRequest());
    try {
        const response = await axios.delete(`${BASE_URL}/cart/${id}`);
        if (response.status === 200) {
            dispatch(deleteProductCartSuccess(response.data));
            dispatch(fetchCart());
            return { success: true, message: "Product removed successfully!" };
        } else {
            return { success: false, message: "Unexpected response from server." };
        }

    } catch (error) {
        dispatch(deleteProductCartFailure(error));
        return { success: false };
    }
}


// Add order 
const addOrderRequest = () => {
    return {
        type: types.ADD_ORDER_REQUEST
    }
}
const addOrderSuccess = (payload) => {
    return {
        type: types.ADD_ORDER_SUCCESS,
        payload,
    }
}
const addOrderFailure = (payload) => {
    return {
        type: types.ADD_ORDER_FAILURE,
        payload,
    }
}
const addOrder = (payload) => (dispatch) => {
    dispatch(addOrderRequest());

    axios.post(`${BASE_URL}/orders`, payload)
        .then(response => {
            dispatch(addOrderSuccess(response.data));
        })
        .then(() => dispatch(emptyCart(payload)))
        .catch(error => {
            dispatch(addOrderFailure(error));
        });
}


// empty cart 
const emptyCartRequest = () => {
    return {
        type: types.EMPTY_CART_REQUEST
    }
}
const emptyCartSuccess = () => {
    return {
        type: types.EMPTY_CART_SUCCESS
    }
}
const emptyCart = (payload) => async (dispatch) => {
    dispatch(emptyCartRequest());
    const { id } = payload;
    dispatch(deleteProductCart(id))
    dispatch(emptyCartSuccess)

};


// fetch order to show on order page 
const fetchOrderRequest = () => {
    return {
        type: types.FETCH_ORDER_REQUEST,

    }
}
const fetchOrderSuccess = (payload) => {
    return {
        type: types.FETCH_ORDER_SUCCESS,
        payload,
    }
}
const fetchOrderFailure = () => {
    return {
        type: types.FETCH_ORDER_FAILURE,

    }
}
const fetchOrder = () => (dispatch) => {
    dispatch(fetchOrderRequest());
    axios.get(`${BASE_URL}/orders`)
        .then(r => dispatch(fetchOrderSuccess(r.data)))
        .catch(e => dispatch(fetchOrderFailure(e.data)))

}



// delete order 
const deleteOrderRequest = () => {
    return {
        type: types.DELETE_ORDER_REQUEST,

    }
}
const deleteOrderSuccess = (payload) => {
    return {
        type: types.DELETE_ORDER_SUCCESS,
        payload,
    }
}
const deleteOrderFailure = () => {
    return {
        type: types.DELETE_ORDER_FAILURE,

    }
}
const deleteOrderProducts = (id) => (dispatch) => {
    dispatch(deleteOrderRequest())
    axios.delete(`${BASE_URL}/orders/${id}`)
        .then((res) => {
            dispatch(deleteOrderSuccess(res.data))
            dispatch(fetchOrder());
        })

        .catch(err => dispatch(deleteOrderFailure(err.data)))

}


// Add prducts Admin 
const AddProductsRequest = () => {
    return {
        type: types.ADD_PRODUCT_REQUEST
    }
}
const AddProductsSuccess = (payload) => {
    return {
        type: types.ADD_PRODUCT_SUCCESS,
        payload,
    }
}
const AddProductsFailure = () => {
    return {
        type: types.ADD_PRODUCT_FAILURE
    }
}
const addProducts = (data) => async (dispatch) => {
    dispatch(AddProductsRequest());
    try {
        const res = await axios.post(`${BASE_URL}/products/add`, data)
        dispatch(AddProductsSuccess(res.data))
        dispatch(fetchData())
        return { status: true }
    } catch (e) {
        dispatch(AddProductsFailure(e.message))
        return { status: false }
    }
}


// edit products admin 
const EditProductsRequest = () => {
    return {
        type: types.EDIT_PRODUCT_REQUEST
    }
}
const EditProductsSuccess = (payload) => {
    return {
        type: types.EDIT_PRODUCT_SUCCESS,
        payload,
    }
}
const EditProductsFailure = () => {
    return {
        type: types.EDIT_PRODUCT_FAILURE
    }
}
const editProducts = (id, data) => async (dispatch) => {
    dispatch(EditProductsRequest());
    try {
        const res = await axios.put(`${BASE_URL}/products/${id}`, data)
        console.log("edit", res.data)
        dispatch(EditProductsSuccess(res.data.data))
        dispatch(fetchData())
        return { status: true }
    } catch (e) {
        dispatch(EditProductsFailure(e.message))
        return { status: false }
    }
}


// delete products admin 
const DeleteProductsRequest = () => {
    return {
        type: types.DELETE_PRODUCT_REQUEST
    }
}
const DeleteProductsSuccess = (payload) => {
    return {
        type: types.DELETE_PRODUCT_SUCCESS,
        payload,
    }
}
const DeleteProductsFailure = () => {
    return {
        type: types.DELETE_PRODUCT_FAILURE
    }
}
const deleteProducts = (id) => async (dispatch) => {
    dispatch(DeleteProductsRequest())
    try {
        const res = await axios.delete(`${BASE_URL}/products/${id}`)
        dispatch(DeleteProductsSuccess(res.data))
        dispatch(fetchData())
        return { status: true }
    } catch (e) {
        dispatch(DeleteProductsFailure(e.message))
        return { status: false }
    }
}


export {
    fetchData, deleteOrderProducts, editProducts, deleteProducts, emptyCart, fetchOrder, getSingleProduct,
    addProductCart, fetchCart, deleteProductCart, addOrder, addProducts, startLoading, stopLoading
};
