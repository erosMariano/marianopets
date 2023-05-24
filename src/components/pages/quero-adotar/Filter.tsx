import React, { useCallback, useEffect, useState } from "react";
import ButtonFilter from "./ButtonFilter";

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

  // UseCallback para evitar renderizações desnecessárias por conta do useEffect
  const filterActive = useCallback((indexElement: number) => {
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
    localStorage.removeItem("tag-pet")
  }, [setListItemFilter]);

  useEffect(() => {
    const listTypeAnimals = [
      "all",
      "dog",
      "cat",
      "bird",
      "fish",
      "rodent",
      "reptile",
    ];
    const itemLocalStorage = localStorage.getItem("tag-pet");
    if (itemLocalStorage) {
      const indexLocalStorage = listTypeAnimals.findIndex(
        (el) => el === itemLocalStorage
      );
      filterActive(indexLocalStorage);
    } else {
      defineItemActiveFilter(itemActiveFilter);
    }
  }, [defineItemActiveFilter, filterActive, itemActiveFilter]);

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
