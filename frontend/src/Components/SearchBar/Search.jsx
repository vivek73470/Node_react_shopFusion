import React, { useEffect, useState } from 'react'
import './search.css'
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../Redux/products/action';
import { useNavigate } from 'react-router-dom';

function Search() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredCategories, setFilteredCategories] = useState([]);
    const product = useSelector((store) => store.ProductReducer.products);

    useEffect(() => {
        dispatch(fetchData());
    }, [dispatch]);

    useEffect(() => {
        if (searchTerm === '') {
            // Reset filteredCategories to empty array when search term is empty
            setFilteredCategories([]);
        } else {
            // Filter unique categories based on search term
            const uniqueCategories = [...new Set(product
                .filter((item) => item.category.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((item) => item.category))];
            setFilteredCategories(uniqueCategories);
        }
    }, [searchTerm, product]);

    const handleInputChange = (event) => {
        const { value } = event.target;
        setSearchTerm(value);
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
                {searchTerm !== '' && (
                    <div className='search-item-after'>
                        {filteredCategories.length === 0 ? (
                            <div>No match found</div>
                        ) : (
                            filteredCategories.map((category) => (
                                <div style={{cursor:'pointer'}} onClick={()=>navigate('/products')} key={category}>{category}</div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </>
    );
}

export default Search;
