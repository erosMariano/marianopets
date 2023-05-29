import FilterQueroAdotar from "@/components/pages/quero-adotar/Filter";
import { screen, render, fireEvent } from "@testing-library/react";
import React from "react";

const mockFilterQueroAdotar = {
  defineItemActiveFilter: jest.fn(),
  setListItemFilter: jest.fn(),
  listItemFilter: [
    { type: "type1", name: "name1", active: true },
    { type: "type2", name: "name2", active: false },
  ],
};

describe("Filter component", () => {
  beforeEach(() => {
    render(
      <FilterQueroAdotar
        defineItemActiveFilter={mockFilterQueroAdotar.defineItemActiveFilter}
        listItemFilter={mockFilterQueroAdotar.listItemFilter}
        setListItemFilter={mockFilterQueroAdotar.setListItemFilter}
      />
    );
  });

  it("renders the correct number of filter buttons", () => {
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBe(mockFilterQueroAdotar.listItemFilter.length);
  });

  it("trigger setListItemFilter function on button click", () => {
    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[0]);

    expect(mockFilterQueroAdotar.setListItemFilter).toHaveBeenCalled()
  });

  it("trigger defineItemActiveFilter function on button click", () => {
    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[0]);

    expect(mockFilterQueroAdotar.defineItemActiveFilter).toHaveBeenCalled()
  });

  it("triggers defineItemActiveFilter correctly when no value is stored in localStorage", () => {
    expect(mockFilterQueroAdotar.defineItemActiveFilter).toHaveBeenCalledWith(0)
  })
});
