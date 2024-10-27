// Login.test.tsx
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Login from "../Login";

describe("Login Component", () => {
  test("renders without crashing", () => {
    const { getByPlaceholderText } = render(<Login />);

    expect(getByPlaceholderText("Email")).toBeTruthy();
    expect(getByPlaceholderText("Password")).toBeTruthy();
  });

  test("shows error when email is empty", () => {
    const { getByPlaceholderText, getByText } = render(<Login />);

    fireEvent.press(getByText("Login"));

    expect(getByText("Email is required")).toBeTruthy();
  });

  test("shows error when email format is invalid", () => {
    const { getByPlaceholderText, getByText } = render(<Login />);

    fireEvent.changeText(getByPlaceholderText("Email"), "invalid-email");
    fireEvent.changeText(getByPlaceholderText("Password"), "password123");
    fireEvent.press(getByText("Login"));

    expect(getByText("Invalid email format")).toBeTruthy();
  });

  test("shows error when password is empty", () => {
    const { getByPlaceholderText, getByText } = render(<Login />);

    fireEvent.changeText(getByPlaceholderText("Email"), "test@example.com");
    fireEvent.press(getByText("Login"));

    expect(getByText("Password is required")).toBeTruthy();
  });

  test("does not show error messages when inputs are valid", () => {
    const { getByPlaceholderText, queryByText, getByText } = render(<Login />);

    fireEvent.changeText(getByPlaceholderText("Email"), "test@example.com");
    fireEvent.changeText(getByPlaceholderText("Password"), "password123");
    fireEvent.press(getByText("Login"));

    expect(queryByText("Email is required")).toBeNull();
    expect(queryByText("Invalid email format")).toBeNull();
    expect(queryByText("Password is required")).toBeNull();
  });
});
