import { screen, render } from "@testing-library/react";
import AdoteDog from "../../../../assets/images/adote-cao.png";
import { CardAdote } from "@/components/pages/Home/Adote/CardAdote";

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
