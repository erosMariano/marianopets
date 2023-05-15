import React from "react";

interface ButtonFilterProps {
  name: string;
  active: boolean;
  activeItemFunc: (indexElement: number) => void;
  indexElement: number;
}
function ButtonFilter({ name, active, activeItemFunc, indexElement }: ButtonFilterProps) {
  function handleSelectType() {
    activeItemFunc(indexElement)
  }
  return (
    <button className={`${active && 'font-semibold bg-[#FD772B] text-white'}  text-light-text transition-all p-3 font-medium rounded-lg` } onClick={() => handleSelectType()}>
      {name}
    </button>
  );
}

export default ButtonFilter;
