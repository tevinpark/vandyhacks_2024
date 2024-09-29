"use client";

import { useState } from 'react';
import '../styles/globals.css';

export default function Dropdown({ selectedOption, onOptionChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    onOptionChange(option);
    setIsOpen(false);
  };

  return (
    <div className="dropdown">
      <button onClick={toggleDropdown} className="dropdown-toggle">
        {selectedOption || 'Select Department'}
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          <li>
            <button onClick={() => handleOptionClick('Select Department')}>
              Select Department
            </button>
          </li>
          <li>
            <button onClick={() => handleOptionClick('AADS Department')}>
            AADS Department
            </button>
          </li>
          <li>
            <button onClick={() => handleOptionClick('CAL Department')}>
            CAL Department
            </button>
          </li>
          <li>
            <button onClick={() => handleOptionClick('Anthropology Department')}>
            Anthropology Department
            </button>
          </li>
          <li>
            <button onClick={() => handleOptionClick('Art Department')}>
            Art Department
            </button>
          </li>
          <li>
            <button onClick={() => handleOptionClick('Biology Department')}>
            Biology Department
            </button>
          </li>
          <li>
            <button onClick={() => handleOptionClick('Buisiness Department')}>
            Buisiness Department
            </button>
          </li>
          <li>
            <button onClick={() => handleOptionClick('Chemistry Department')}>
              Chemistry Department
            </button>
          </li>
          <li>
            <button onClick={() => handleOptionClick('English Department')}>
            English Department
            </button>
          </li>
          <li>
            <button onClick={() => handleOptionClick('Math Department')}>
              Math Department
            </button>
          </li>
          <li>
            <button onClick={() => handleOptionClick('Physics/Astronomy Department')}>
              Physics/Astronomy Department
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
