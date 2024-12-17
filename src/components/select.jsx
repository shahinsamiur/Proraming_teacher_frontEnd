import React, { useState, useRef, useEffect } from "react";

export default function SelectComponent  ({ options, selectedValue, onChange, placeholder = "Select an option" }){
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (value) => {
    onChange(value);
    setIsOpen(false);
  };

  return (
    <div ref={wrapperRef} className="relative w-[30%] h-[auto] text-[0.9vw]">
      {/* Selector Box */}
      <div
        className="text-white rounded px-4 py-2 cursor-pointer flex gap-[5%] justify-between items-center bg-inherit"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={selectedValue ? "text-white" : "text-white"}>
          {selectedValue ? options.find((opt) => opt.value === selectedValue)?.label : placeholder}
        </span>
        <span className="text-white">{isOpen ? "▲" : "▼"}</span>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-10 mt-2 w-full border border-gray-300 rounded bg-[#101010] shadow-md">
          {options.map((option) => (
            <div
              key={option.value}
              className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                selectedValue === option.value ? "bg-gray-100 font-semibold" : ""
              }`}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};