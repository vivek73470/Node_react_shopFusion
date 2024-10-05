import React, { useCallback, useEffect, useState } from 'react';
import './search.css';
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchData, fetchFilterData } from '../../Redux/products/action'; 
import debounce from 'lodash.debounce';

function Search() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showResults, setShowResults] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const product = useSelector((store) => store.ProductReducer.products);

    // Debounced function to handle search API call
    const handleSearch = useCallback(
        debounce((term) => {
            if (term) {
                const categories = {}; 
                dispatch(fetchFilterData(categories, term));
                setShowResults(true); // Show results when searching
            } else {
                setShowResults(false); // Hide results when the search term is empty
            }
        }, 300), [dispatch]
    );


   useEffect(() => {
        if (searchTerm) {
            handleSearch(searchTerm);
        } else {
            dispatch(fetchData()); 
            setShowResults(false);
        }
        return () => {
            handleSearch.cancel();
        };
    }, [searchTerm, handleSearch, dispatch]);

    const handleInputChange = (event) => {
        const { value } = event.target;
        setSearchTerm(value);
    };
    const handleProductClick = (product) => {
        // Navigate to the product page if not already there
        if (window.location.pathname !== '/products') {
            navigate(`/products`);
        }
        setShowResults(false); // Close the search results
    };


    return (
        <>
        <div className="your-events-searchstyle">
            <span className="span-search-header">
                <CiSearch />
                <input
                    type="search"
                    className="your-events-searchbox-head"
                    placeholder="What are you looking for"
                    value={searchTerm}
                    onChange={handleInputChange}
                />
            </span>
            
            {showResults && ( 
                <div className="search-results">
                    {product.length > 0 ? (
                        product.map((item) => (
                            <div key={item._id} onClick={() => handleProductClick(item)}>
                                <p>{item.title}</p>
                            </div>
                        ))
                    ) : (
                        <p>No products found</p>
                    )}
                </div>
            )}
        </div>
        </>

    );
}

export default Search;
