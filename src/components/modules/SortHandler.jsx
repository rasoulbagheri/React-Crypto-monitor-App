import React from "react";

const SortSelect = ({ onSortChange }) => {
  const handleChange = (event) => {
    onSortChange(event.target.value);
  };

  return (
    <select onChange={handleChange}>
      <option value="name">Sort by Name</option>
      <option value="price">Sort by Price</option>
      <option value="marketCap">Sort by Market Cap</option>
    </select>
  );
};

export default SortSelect;
