import { Header } from "@/components/Header";
import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import { api } from "../../lib/axios";

jest.mock("next/router", () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn()
  })
}));

describe("Header component", () => {
  it("render correctly", () => {
    render(<Header />)

    expect(screen.getByText("Como funciona"))
  });

  it("redirect to login with unauthenticated desktop", () => {
    render(<Header />)

    fireEvent.click(screen.getByTestId("buttonQueroDoarDesk"))
    expect(require("next/router").useRouter().push).toHaveBeenCalledWith("/login")
  });


  it("redirect to login with authenticated desktop", async () => {
    const putMock = jest.fn();
    api.put = putMock;

    render(<Header authenticated/>)


    fireEvent.click(screen.getByTestId("buttonQueroDoarDesk"))

    await waitFor(() => {
      expect(putMock).toHaveBeenCalledTimes(1);
      expect(putMock).toHaveBeenCalledWith("/auth/login")

      expect(require("next/router").useRouter().push).toHaveBeenCalledWith("/login")
    })
  });


  it("redirect to login with unauthenticated mobile", () => {
    render(<Header />)

    fireEvent.click(screen.getByTestId("buttonQueroDoarMobile"))
    expect(require("next/router").useRouter().push).toHaveBeenCalledWith("/login")
  });

  it("redirect to login with authenticated mobile", async () => {
    const putMock = jest.fn();
    api.put = putMock;

    render(<Header authenticated/>)


    fireEvent.click(screen.getByTestId("buttonQueroDoarMobile"))

    await waitFor(() => {
      expect(putMock).toHaveBeenCalledTimes(1)
      expect(putMock).toHaveBeenCalledWith("/auth/login")
      expect(require("next/router").useRouter().push).toHaveBeenCalledWith("/login")
    })
  });
});
