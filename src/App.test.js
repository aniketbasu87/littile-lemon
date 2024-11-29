import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

jest.mock("./components/Header", () => () => <header>Mocked Header</header>);
jest.mock("./components/Footer", () => () => <footer>Mocked Footer</footer>);
jest.mock("./pages/Homepage/HomePage", () => () => <div>Mocked HomePage</div>);
jest.mock("./pages/BookingPage/ReservationManager", () => () => <div>Mocked ReservationManager</div>);
jest.mock("./pages/BookingPage/ConfirmedBooking", () => () => <div>Mocked ConfirmedBooking</div>);

describe("App Component", () => {
  test("renders Header and Footer", () => {
    render(
      <App Router={MemoryRouter} />
    );

    expect(screen.getByText("Mocked Header")).toBeInTheDocument();
    expect(screen.getByText("Mocked Footer")).toBeInTheDocument();
  });

  test("renders HomePage at '/' route", () => {
    render(
      <App Router={({ children }) => <MemoryRouter initialEntries={["/"]}>{children}</MemoryRouter>} />
    );

    expect(screen.getByText("Mocked HomePage")).toBeInTheDocument();
  });

  test("renders ReservationManager at '/booking' route", () => {
    render(
      <App Router={({ children }) => <MemoryRouter initialEntries={["/booking"]}>{children}</MemoryRouter>} />
    );

    expect(screen.getByText("Mocked ReservationManager")).toBeInTheDocument();
  });

  test("renders ConfirmedBooking at '/booking-confirmed' route", () => {
    render(
      <App Router={({ children }) => <MemoryRouter initialEntries={["/booking-confirmed"]}>{children}</MemoryRouter>} />
    );

    expect(screen.getByText("Mocked ConfirmedBooking")).toBeInTheDocument();
  });
});
