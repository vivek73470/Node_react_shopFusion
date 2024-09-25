import React from "react";
import './filter.css'
import { useDispatch } from "react-redux"
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react"
import { fetchFilterData } from "../../Redux/products/action";

const Filter = () => {
  const dispatch = useDispatch();
  const [searchParams, setSerchparams] = useSearchParams()
  const [category, setCategory] = useState(searchParams.getAll("category") || [])
  const [brand_namez, setBrandNamez] = useState(searchParams.getAll("brand_namez") || []);

  const handleChange = (e) => {
    const { value, checked } = e.target;
    let updatedCategories = [...category]; 
  
    if (checked) {
      updatedCategories.push(value);
    } else {
      updatedCategories = updatedCategories.filter(cat => cat !== value);
    }
    setCategory(updatedCategories);

    // dispatch(fetchFilterData(updatedCategories));
  };


  const handleBrandChange = (e) => {
    const { value, checked } = e.target;
    let updatedBrands = [...brand_namez];

    if (checked) {
      updatedBrands.push(value);
    } else {
      updatedBrands = updatedBrands.filter(brand => brand !== value);
    }
    setBrandNamez(updatedBrands);
    // dispatch(fetchFilterData(updatedBrands));
  };

  
  useEffect(() => {
    const params = { category, brand_namez };
    setSerchparams(params);

    dispatch(fetchFilterData({ category, brand_namez }));
  }, [category, brand_namez, setSerchparams, dispatch]);
  

  return (
    <div className="filter-categrs">
      <h3>Filter</h3>

      <div className="filter-category">
        <div className="filter-pdng">
          <input type="checkbox"
            id="filtr-chck"
            value="men's clothing"
            checked={category.includes("men's clothing")}
            onChange={handleChange} />
          <label className="filter-label-dgn">Men cloths</label>
        </div>
        <div className="filter-pdng">
          <input type="checkbox"
            id="filtr-chck"
            value="covers"
            checked={category.includes("covers")}
            onChange={handleChange} />
          <label className="filter-label-dgn">Mobile Covers</label>
        </div>
        <div className="filter-pdng">
          <input type="checkbox"
            id="filtr-chck"
            value="women's clothing"
            checked={category.includes("women's clothing")}
            onChange={handleChange}
          />
          <label className="filter-label-dgn">Women cloths</label>
        </div>
      </div>

      <div>
        <h3>Brand</h3>
        <div className="filter-category">
        <div className="filter-pdng">
        <input type="checkbox"
            id="filtr-chck"
            value="zara"
            checked={brand_namez.includes("zara")}
            onChange={handleBrandChange} />
          <label className="filter-label-dgn">Zara</label>
        </div>
        <div className="filter-pdng">
        <input type="checkbox"
            id="filtr-chck"
            value="gucci"
            checked={brand_namez.includes("gucci")}
            onChange={handleBrandChange} />
          <label className="filter-label-dgn">Gucci</label>
        </div>
        <div className="filter-pdng">
        <input type="checkbox"
            id="filtr-chck"
            value="hm"
            checked={brand_namez.includes("hm")}
            onChange={handleBrandChange} />
          <label className="filter-label-dgn">H&M</label>
        </div>
      </div>
      </div>
    </div>
  );
};

export { Filter }
