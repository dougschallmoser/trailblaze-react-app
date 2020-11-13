import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateFilters } from '../actions';
import { getUsers } from '../actions';

const SearchFilters = () => {

  const query = useSelector(state => state.search.query)
  const [clicked, setClicked] = useState(false);
  const dispatch = useDispatch();

  const handleClick = () => {
    setClicked(prevState => !prevState)
  }

  const handleChange = (event) => {
    dispatch(updateFilters({...query, [event.target.name]: event.target.value}))
    dispatch(getUsers({...query, [event.target.name]: event.target.value}))
  }

  const renderDropdown = 
    <div className="dropdown-content">
      <div className="dropdown-content-item">
        <span className="dropdown-content-header">Age</span>
        <input
          name="agemin"
          type="text"
          value={query.agemin}
          className="age-input-field"
          onChange={handleChange}
          placeholder="Min"
        /> {' - '}
        <input
          name="agemax"
          type="text"
          value={query.agemax}
          className="age-input-field"
          onChange={handleChange}
          placeholder="Max"
        />
      </div>
      <div className="dropdown-content-item gender">
        <span className="dropdown-content-header">Gender</span>
        <select value={query.gender} onChange={handleChange} name="gender">
          <option value="any">Any</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="nonbinary">Non-binary</option>
        </select>

      </div>
    </div>

  return (
    <div className="dropdown-menu">
      <button className="filter-button" onClick={handleClick}>
        Filter
      </button>
      {clicked ? renderDropdown : null}
    </div>
  )
}

export default SearchFilters;