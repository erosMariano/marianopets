import Home from "../pages/index";
import { screen, render } from "@testing-library/react";

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))


describe("Home component", () => {
  it("render correctly", () => {
    render(<Home />);
    expect(screen.getByText("Encha sua casa de amor"));
  });
});
