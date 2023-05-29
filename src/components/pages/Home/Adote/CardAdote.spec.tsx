import { screen, render } from "@testing-library/react";
import { CardAdote } from "./CardAdote";
import AdoteDog from "../../../../assets/images/adote-cao.png";

const propsCardAdote = {
  animalInfo: {
    title: "Meu animal",
    image: AdoteDog,
    altImage: "Minha imagem",
    type: "dog"
  },
  isSmall: false
}

jest.mock("next/router", () => ({
  useRouter: jest.fn()
}))

describe("CardADote component", () => {
  it("CardADote ", () => {
    render(<CardAdote animalInfo={propsCardAdote.animalInfo} isSmall={propsCardAdote.isSmall}/>);
    expect(screen.getByText("Meu animal")).toBeInTheDocument()
    expect(screen.getByAltText("Minha imagem")).toBeInTheDocument()
  });
});
