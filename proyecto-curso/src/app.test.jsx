import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

describe("App", () => {
  test("Renderiza el form de login sin estar logueado", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const loginFormElement = screen.getByTestId("login-form");
    expect(loginFormElement).toBeInTheDocument();
  });

  test("renders Dashboard when logged in", () => {
    localStorage.setItem("token", "dummyToken");

    render(
      <MemoryRouter initialEntries={["/dashboard"]}>
        <App />
      </MemoryRouter>
    );

    const dashboardElement = screen.getByTestId("dashboard");
    expect(dashboardElement).toBeInTheDocument();
  });

  test("logs out and navigates to login page when logging out", async () => {
    localStorage.setItem("token", "dummyToken");

    render(
      <MemoryRouter initialEntries={["/dashboard"]}>
        <App />
      </MemoryRouter>
    );

    const logoutButton = screen.getByText("Log Out");
    fireEvent.click(logoutButton);

    await waitFor(() => {
      const loginFormElement = screen.getByTestId("login-form");
      expect(loginFormElement).toBeInTheDocument();
    });

    expect(localStorage.getItem("token")).toBeNull();
  });
});
