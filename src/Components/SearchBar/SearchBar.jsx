import React, { useEffect, useState } from "react";
import "./searchBar.css";

const SearchBar = ({ filter, setFilter }) => {
  const [selectedBedrooms, setSelectedBedrooms] = useState([]);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isFurnished, setIsFurnished] = useState(false);
  const [open, setOpen] = useState(false);

  const handleTypeChange = (event) => {
    const selectedValue = event.target.getAttribute("data-value");

    // const name = event.target.id;
    setFilter({
      ...filter,
      property_type: selectedValue,
    });
  };


  const handleDropdownToggle = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleClose = () => {
    if (isDropdownOpen === true) {
      setDropdownOpen(false);
    } else {
      return null;
    }
  };


  function handleInputChange(e) {
    const { name, value } = e.target;
    setFilter({
      ...filter,
      [name]: value,
    });
  }
  const clearAll = () => {
    setFilter({
      property_type: "all",
      minPrice: "",
      maxPrice: "",
      bedrooms: [],
      minSize: "",
      maxSize: "",
      furnished: "",
    });
    setSelectedBedrooms([])
    setIsFurnished(false)
  };
  const propertyTypes = [
    "Appartement",
    "Guest House",
    "Land",
    "Penthouse",
    "Townhouse",
    "Villa",
    "Office space",
    "Retail",
    "Shop",
    "Show room",
    "Business center",
    "Warehouse",
    "Plot",
    "Studio"
  ];

  const toggleBedroomSelection = (bedroom) => {
    if (selectedBedrooms.includes(bedroom)) {
      setSelectedBedrooms(selectedBedrooms.filter((bed) => bed !== bedroom));
    } else {
      setSelectedBedrooms([...selectedBedrooms, bedroom]);
    }
  };
  const toggleFurnished=()=>{
    if(filter.furnished===""){
      setFilter({...filter,
      furnished:true})
    }else{
      setFilter({...filter,
        furnished:""})
    }
  }
  useEffect(() => {
if(selectedBedrooms.length>0){
  setFilter({...filter,
  bedrooms:selectedBedrooms})
}else{
  setFilter({...filter,
    bedrooms:""})
}
  }, [selectedBedrooms])
  

  const isBedroomSelected = (bedroom) => selectedBedrooms.includes(bedroom);

  return (
    <>
      {/* side bar filtering will not be visible in offplan page */}
      <button
        className="filter"
        onClick={() => {
          setOpen(true);
        }}
      >
        Filter
      </button>
      <aside
        className={open ? "searchbar_container open" : "searchbar_container"}
        onClick={handleClose}
      >
        <div className="search_header">
          <h3>Filter</h3>
          <button className="clear_button" onClick={clearAll}>
            Clear all
          </button>
        </div>
        <div className="search_body">
          <div className="type_container">
            <h4 className="type_title">Type Of Place</h4>
            <div
              className={
                isDropdownOpen ? "filtering filtering_open" : "filtering"
              }
              onClick={handleDropdownToggle}
            >
              <span className="main_span">
                {filter.property_type}
                <i className="fa-solid fa-caret-down"></i>
              </span>
              {isDropdownOpen && (
                <ul>
                  <li
                    data-value={"all"}
                    id={"property_type"}
                    onClick={handleTypeChange}
                  >
                    All
                  </li>
                  {propertyTypes.map((type, i) => (
                    <li
                      key={i}
                      data-value={type}
                      id={"property_type"}
                      onClick={handleTypeChange}
                    >
                      {type}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className="price_container">
            <h4 className="price_title">Price Range</h4>
            <div className="minmax_wrapper">
              <div className="input_parent">
                <input
                  type="number"
                  placeholder="Min"
                  name="minPrice"
                  onChange={handleInputChange}
                  value={filter.minPrice}
                />
                <i>PKR</i>
              </div>
              <div className="input_parent">
                <input
                  type="number"
                  placeholder="Max"
                  name="maxPrice"
                  onChange={handleInputChange}
                  value={filter.maxPrice}
                />
                <i>PKR</i>
              </div>
            </div>
          </div>
          <div className="bedrooms_container">
            <h4 className="bedrooms_title">Number Of Bedrooms  <span>
              {selectedBedrooms.sort().join(', ')}
              </span>
              </h4>
            <div className="bedroom-selector">
              {["studio",1, 2, 3, 4, 5, 6, 7].map((bedroom) => (
                <div
                  key={bedroom}
                  className={`bedroom-option ${
                    isBedroomSelected(bedroom) ? 'selected' : ''
                  }`}
                  onClick={() => toggleBedroomSelection(bedroom)}
                >
                  {bedroom!==7?bedroom:bedroom+"+"}
                </div>
              ))}
            </div>
          </div>
          <div className="options_container">
            <h4 className="options_title">Options</h4>
            <div
                  className={`bedroom-option ${
                    isFurnished ? 'selected' : ''
                  }`}
                  onClick={() => {setIsFurnished(!isFurnished) ;toggleFurnished()}}
                >
                  Furnished
                </div>
          </div>
          <div className="space_container">
            <h4 className="space_title">Space Range</h4>
            <div className="minmax_wrapper">
              <div className="input_parent">
                <input
                  type="number"
                  placeholder="Min"
                  name="minSize"
                  onChange={handleInputChange}
                  value={filter.minSize}
                />
                <span className="meter square">sqft</span>
              </div>
              <div className="input_parent">
                <input
                  type="number"
                  placeholder="Max"
                  name="maxSize"
                  onChange={handleInputChange}
                  value={filter.maxSize}
                />
                <span className="meter square">sqft</span>
              </div>
            </div>
          </div>
          <button className="search_button" onClick={()=>{setOpen(false)}}>Search</button>
          <button
            className="cancel_button"
            onClick={() => {
              setOpen(false);
            }}
          >
            Cancel
          </button>
        </div>
      </aside>
    </>
  );
};

export default SearchBar;
