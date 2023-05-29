import { Adote } from "@/components/pages/Home/Adote";
import { Depoimentos } from "@/components/pages/Home/Depoimentos";
import { Hero } from "@/components/pages/Home/Hero";
import { NosAjudar } from "@/components/pages/Home/NosAjudar";
import { NossaTarefa } from "@/components/pages/Home/NossaTarefa";
import { screen, render } from "@testing-library/react";

import { Footer } from "../../components/Footer";
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("Page Home renders", () => {
  it("Hero component", () => {
    render(<Hero />);

    expect(screen.getByText("Encha sua casa de amor")).toBeInTheDocument();
  });

  it("NosAjudar component", () => {
    render(<NosAjudar />);

    expect(screen.getByText("Você pode nos ajudar!")).toBeInTheDocument();
  });

  it("NossaTarefa component", () => {
    render(<NossaTarefa />);

    expect(screen.getByText("Nossa tarefa")).toBeInTheDocument();
  });

  it("Adote component", () => {
    render(<Adote />);

    expect(screen.getByText("Adote um pet")).toBeInTheDocument();
  });

  it("Depoimentos component", () => {
    render(<Depoimentos />);
    expect(screen.getByText("Depoimentos")).toBeInTheDocument();
  });

  it("Depoimentos component", () => {
    render(<Footer />);
    expect(screen.getByAltText("Logo mariano pets")).toBeInTheDocument()
  });
});
