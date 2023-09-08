import React, {useEffect, useRef, useState} from 'react';
function Globaladdress() {
  const inputRef = useRef(null);
  const [suggestions, setSuggestions] = useState([]);

  const autoCompleteAddress = (query) => {
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}`)
      .then(response => response.json())
      .then(data => {
        setSuggestions(data);
      })
      .catch(error => {
        console.error(error);
      });
  }

  const handleInputChange = () => {
    const query = inputRef.current.value;
    autoCompleteAddress(query);
  }

  const handleSuggestionClick = (address) => {
    inputRef.current.value = address;
    setSuggestions([]);
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        className="form-control"
        placeholder="Enter your address"
        autoComplete='off'
        name='address'
        onChange={handleInputChange}
      />
      <ul>
        {suggestions.map((item, index) => (
          <li 
            key={index}
            onClick={() => handleSuggestionClick(item.display_name)}
          >
            {item.display_name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Globaladdress;