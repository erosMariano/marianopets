import ButtonFilter from "@/components/pages/quero-adotar/ButtonFilter";
import { screen, render, fireEvent } from "@testing-library/react";

describe("Button component", () => {
  const activeItemFunc = jest.fn();
  it("render correctly", () => {
    render(
      <ButtonFilter
        active
        activeItemFunc={activeItemFunc}
        name="Cachorro"
        indexElement={0}
      />
    );

    expect(screen.getByText("Cachorro"));
  });

  it("Click in button", () => {
    render(
      <ButtonFilter
        active
        activeItemFunc={activeItemFunc}
        name="Cachorro"
        indexElement={0}
      />
    );

    const button = screen.getByText("Cachorro");
    fireEvent.click(button);

    expect(activeItemFunc).toHaveBeenCalled();
  });

  it("button active", () => {
    render(
      <ButtonFilter
        active
        activeItemFunc={activeItemFunc}
        name="Cachorro"
        indexElement={0}
      />
    );

    expect(screen.getByText("Cachorro")).toHaveClass("bg-orange-400")
  });

  it("button disabled", () => {
    render(
      <ButtonFilter
        active={false}
        activeItemFunc={activeItemFunc}
        name="Cachorro"
        indexElement={0}
      />
    );
    screen.debug()
    expect(screen.getByText("Cachorro")).toHaveClass("bg-transparent")
  });
});
