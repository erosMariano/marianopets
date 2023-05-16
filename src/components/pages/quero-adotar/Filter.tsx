import React, { useEffect, useState } from "react";
import ButtonFilter from "./ButtonFilter";
import Image from "next/image";

interface FilterQueroAdotar {
  defineItemActiveFilter: (el: number) => void;
  setListItemFilter: React.Dispatch<
    React.SetStateAction<
      {
        type: string;
        name: string;
        active: boolean;
      }[]
    >
  >;
  listItemFilter: {
    type: string;
    name: string;
    active: boolean;
  }[];
}
function FilterQueroAdotar({
  defineItemActiveFilter,
  setListItemFilter,
  listItemFilter,
}: FilterQueroAdotar) {
  const [itemActiveFilter, setItemActiveFilter] = useState(0);

  function filterActive(indexElement: number) {
    setListItemFilter((prevState) => {
      const updatedList = prevState.map((item, index) => {
        if (index === indexElement) {
          return { ...item, active: !item.active };
        } else {
          return { ...item, active: false };
        }
      });

      // Verificar se todos os itens estão desativados
      const allItemsInactive = updatedList.every((item) => !item.active);

      if (allItemsInactive) {
        updatedList[indexElement].active = true; // Definir o primeiro item como ativo
      }

      return updatedList;
    });

    setItemActiveFilter(indexElement);
  }

  useEffect(() => {
    defineItemActiveFilter(itemActiveFilter);
  }, [defineItemActiveFilter, itemActiveFilter]);

  return (
    <div className="flex lg:justify-center items-center gap-8 mb-8 overflow-x-scroll transparent-scrollbar">
      <div className="w-max flex">
        {listItemFilter.map(({ name, active }, index) => {
          return (
            <ButtonFilter
              name={name}
              active={active}
              key={index}
              indexElement={index}
              activeItemFunc={filterActive}
            />
          );
        })}
      </div>
    </div>
  );
}

export default FilterQueroAdotar;
