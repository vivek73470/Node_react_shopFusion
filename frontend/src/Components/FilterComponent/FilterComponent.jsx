import React from "react";
import './filter.css'
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react"

const Filter = () => {
  const [searchParams, setSerchparams] = useSearchParams()
  const [category, setCategory] = useState(searchParams.getAll("category") || [])
 
  const handleChange = (e) => {
    const option = e.target.value
    const newCategory = [...category]
    if (category.includes(option)) {
      newCategory.splice(newCategory.indexOf(option), 1)
    } else {
      newCategory.push(option)
    }
    setCategory(newCategory)
  }

  useEffect(() => {
    if (category) {
      setSerchparams({ category })
    }
  }, [category, setSerchparams])

  return (
    <div className="filter-categrs">
      <h3>Categories</h3>
   
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
    </div>
  );
};

export { Filter }
