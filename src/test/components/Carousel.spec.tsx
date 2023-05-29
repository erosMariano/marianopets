import Carousel from "@/components/Carousel";
import { screen, render, fireEvent, getByAltText } from "@testing-library/react";
const slides = [
  {
    id: 1,
    photoAnimal:
      "https://firebasestorage.googleapis.com/v0/b/inductive-way-386721.appspot.com/o/files%2Fpassaro-madagascar-abre-conexao-planeta.jpg?alt=media&token=46da338b-8bd9-4e21-91a7-159b354f98cc",
  },
  {
    id: 2,
    photoAnimal:
      "https://firebasestorage.googleapis.com/v0/b/inductive-way-386721.appspot.com/o/files%2Fpassaro-madagascar-abre-conexao-planeta.jpg?alt=media&token=46da338b-8bd9-4e21-91a7-159b354f98cc",
  },
];
describe("Carousel component", () => {
  it("render correctly", () => {
    render(<Carousel slides={slides} />);

    expect(screen.getAllByAltText("Slide 1"));
  });

  it("verify change slide in click button", () => {
    const handleSlideChange = jest.fn()

    render(<Carousel slides={slides} />);
    const button = screen.getByAltText("Slide 2")

    fireEvent.click(button)
    expect(screen.getByAltText("Slide 2 small"))
  });
});
