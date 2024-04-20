import React, { useState } from "react";
import '../styles/View.css'

const Filters = () => {
  const [activeFilter, setActiveFilter] = useState(null);

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };

  const closeModal = () => {
    setActiveFilter(null);
  };

  const filterOptions = {
    Diet: ["Gluten-free", "Ketogenic", "Vegetarian", "Vegan", "Pescetarian"],
    Cuisine: ["African","Asian", "American", "Caribbean", "French", "Italian", "Indian", "Latin American", "Mediterranean", "Mexican","Middle Eastern", "Spanish"], 
    Time: [20, 30, 45], 
  };

  const renderFilterOptions = () => {
    if (!activeFilter) return null;

    return (
      <div className="bg-white p-4 rounded-lg px-14 py-10">
        <span className="text-gray-800 block mb-2">
          {activeFilter}:
        </span>
        <div className="space-y-2">
          {filterOptions[activeFilter].map((option, index) => (
            <label key={index} className="flex items-center">
              <input type="checkbox" className="form-checkbox" />
              <span className="ml-2">{option}</span>
            </label>
          ))}
        </div>
        <button
          onClick={closeModal}
          className="mt-4 px-4 py-2 bg-gray-800 text-white rounded-md"
        >
          Save
        </button>
      </div>
    );
  };

  return (
    <div className="filters flex-row justify-center items-center">
    <div className="filters">
      <span> Filters: </span>
      {Object.keys(filterOptions).map((filter, index) => (
        <span
          key={index}
          onClick={() => handleFilterClick(filter)}
          className="cursor-pointer filter"
        >
          {" "}
          {filter}{" "}
        </span>
      ))}
      {activeFilter && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
          {renderFilterOptions()}
        </div>
      )}
    </div>
    </div>
  );
};

export default Filters;
