import React, { useState } from "react";

interface SelectAnimalProps {
  selectedItem: string;
  setSelectedItem: React.Dispatch<React.SetStateAction<string>>;
}
function SelectAnimal({ selectedItem, setSelectedItem }: SelectAnimalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
    setIsOpen(false);
  };

  const items = ["Cachorro", "Gato", "Pássaro", "Peixe", "Roedor", "Réptil"];

  return (
    <div className="relative inline-block">
      <div
        className="bg-white border border-gray-300 rounded-md p-2 cursor-pointer"
        onClick={toggleDropdown}
      >
        <span className="mr-2 font-semibold text-gray-700">
          {selectedItem || "Selecione um tipo de animal"}
        </span>
      </div>
      {isOpen && (
        <div className="absolute w-full z-10 bg-white border border-gray-300 mt-1 rounded-md shadow-md font-semibold text-gray-700">
          {items.map((item, index) => (
            <div
              key={index}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer font-semibold text-gray-700"
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
