import React, { useCallback,useState } from 'react';
import './search.css';
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import {fetchSearchData, fetchSearchDropdown } from '../../Redux/products/action';
import debounce from 'lodash.debounce';

function Search() {
    const dispatch = useDispatch();
    const [query, setQuery] = useState('');
    const products = useSelector((store) => store.ProductReducer.products);
    const dropdownResults  = useSelector((store) => store.ProductReducer.dropdownResults );

  const debounceSearch = useCallback(
    debounce((searchQuery) => {
        if (searchQuery) {
            dispatch(fetchSearchDropdown(searchQuery));
        }
    }, 500),
    []
);

    const handleInputChange = (event) => {
        const { value } = event.target;
        setQuery(value);
        debounceSearch(value);
    };
    const handleSelectProduct = (product) => {
        dispatch(fetchSearchData(product.filtercategory));
        setQuery(''); 
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
                        value={query}
                        onChange={handleInputChange}
                    />
                </span>
                {query && products && products.length > 0 && (
                       <ul className="search-results">
                       {dropdownResults.map((product) => (
                           <div key={product._id} onClick={() => handleSelectProduct(product)}>
                               <p>{product.filtercategory}</p>
                           </div>
                       ))}
                   </ul>
                )}

            </div>
        </>

    );
}

export default Search;
