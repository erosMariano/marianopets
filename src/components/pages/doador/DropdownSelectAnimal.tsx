import React, { useState } from "react";

function SelectAnimal() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
    setIsOpen(false);
  };

  const items = ["Item 1", "Item 2", "Item 3"];

  return (
    <div className="relative inline-block">
      <div
        className="bg-white border border-gray-300 rounded-md p-2 cursor-pointer"
        onClick={toggleDropdown}
      >
        <span className="mr-2">{selectedItem || "Selecione um tipo de animal"}</span>
      </div>
      {isOpen && (
        <div className="absolute w-full z-10 bg-white border border-gray-300 mt-1 rounded-md shadow-md">
          {items.map((item, index) => (
            <div
              key={index}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleItemClick(item)}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SelectAnimal;
