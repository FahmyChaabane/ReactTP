import React, { useEffect, useState } from "react";
import { fetchCategories } from "../../services/news.service";

export default function FilteringComponent({ onFilter }) {
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState({
    text: "",
    selection: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.log("err", error.message);
      }
    };
    fetchData();
  }, []);

  const handleTextChange = ({ target }) => {
    const filterClone = { ...filter, text: target.value };
    setFilter(filterClone);
  };

  const handleSelectChange = ({ target }) => {
    const filterClone = { ...filter, selection: target.value };
    setFilter(filterClone);
  };

  const onSearch = () => {
    onFilter(filter);
  };

  return (
    <div>
      <div className="TextFilter">
        Title:
        <input type="text" value={filter.text} onChange={handleTextChange} />
      </div>
      <div className="SelectionFilter">
        Category:
        <select value={filter.selection} onChange={handleSelectChange}>
          {categories.map((cat, index) => (
            <option key={index}>{cat}</option>
          ))}
        </select>
        <button onClick={onSearch}>Search</button>
      </div>
    </div>
  );
}
