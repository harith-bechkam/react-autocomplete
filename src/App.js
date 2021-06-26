import React, { useState, useEffect, useRef } from 'react';
import './style.css';
import axios from 'axios';

const Auto = () => {
  const [display, setDisplay] = useState(false);
  const [options, setOptions] = useState([]);
  const [search, setSearch] = useState('');
  const wrapperRef = useRef(null);

  useEffect(() => {
    const arr = [];
    axios.get('https://jsonplaceholder.typicode.com/todos').then(res => {
      setOptions(res.data);
    });
  }, []);
  useEffect(() => {
    window.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  });

  const handleClickOutside = event => {
    const { current: wrap } = wrapperRef;
    if (wrap && !wrap.contains(event.target)) {
      setDisplay(false);
    }
  };

  const setpokedex = poke => {
    setSearch(poke);
    setDisplay(false);
  };
  return (
    <div className="flex-container flex-column pos-rel">
      <input
        id="auto"
        onClick={() => setDisplay(!display)}
        placeholder="type to search"
        value={search}
        onChange={event => setSearch(event.target.value)}
      />

      {display && (
        <div className="autoContainer">
          {options
            .filter(({ title }) => title.indexOf(search.toLowerCase()) > -1)
            .map((value, i) => {
              return (
                <div
                  className="option"
                  onClick={() => setpokedex(value.title)}
                  key={i}
                  tabIndex="0"
                >
                  <span>{value.title}</span>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <div className="App">
      <div className="auto-container">
        <Auto />
      </div>
    </div>
  );
}
