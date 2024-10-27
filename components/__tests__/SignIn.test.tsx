import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import SignIn from "../SignIn";
import { signIn } from "../ApiServiceCall";
import { NavigationContainer } from "@react-navigation/native";

const renderWithNavigation = (component: any) => {
  return render(<NavigationContainer>{component}</NavigationContainer>);
};

jest.mock("../ApiServiceCall", () => ({
  signIn: jest.fn(),
}));

describe("SignIn Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renderWithNavigations without crashing", () => {
    const { getByPlaceholderText } = renderWithNavigation(<SignIn />);

    expect(getByPlaceholderText("Name")).toBeTruthy();
    expect(getByPlaceholderText("Email")).toBeTruthy();
    expect(getByPlaceholderText("Password")).toBeTruthy();
  });

  test("shows error when name is empty", () => {
    const { getByText } = renderWithNavigation(<SignIn />);
    fireEvent.press(getByText("Sign In"));

    expect(getByText("Name is required")).toBeTruthy();
  });

  test("shows error when email is empty", () => {
    const { getByPlaceholderText, getByText } = renderWithNavigation(
      <SignIn />
    );
    fireEvent.changeText(getByPlaceholderText("Name"), "John Doe");
    fireEvent.press(getByText("Sign In"));

    expect(getByText("Email is required")).toBeTruthy();
  });

  test("shows error when password is empty", () => {
    const { getByPlaceholderText, getByText } = renderWithNavigation(
      <SignIn />
    );
    fireEvent.changeText(getByPlaceholderText("Name"), "John Doe");
    fireEvent.changeText(getByPlaceholderText("Email"), "john@example.com");
    fireEvent.press(getByText("Sign In"));

    expect(getByText("Password is required")).toBeTruthy();
  });

  test("shows popup on successful sign in", async () => {
    const mockResponse = { status: 200 };
    (signIn as jest.Mock).mockResolvedValue(mockResponse);

    const { getByPlaceholderText, getByText } = renderWithNavigation(
      <SignIn />
    );
    fireEvent.changeText(getByPlaceholderText("Name"), "John Doe");
    fireEvent.changeText(getByPlaceholderText("Email"), "john@example.com");
    fireEvent.changeText(getByPlaceholderText("Password"), "password123");
    fireEvent.press(getByText("Sign In"));

    await waitFor(() =>
      expect(getByText("Welcome to ReactSpring Bank, John Doe!")).toBeTruthy()
    );
  });

  test("shows popup on failed sign in", async () => {
    const mockResponse = { status: 400 };
    (signIn as jest.Mock).mockResolvedValue(mockResponse);

    const { getByPlaceholderText, getByText } = renderWithNavigation(
      <SignIn />
    );
    fireEvent.changeText(getByPlaceholderText("Name"), "John Doe");
    fireEvent.changeText(getByPlaceholderText("Email"), "john@example.com");
    fireEvent.changeText(getByPlaceholderText("Password"), "password123");
    fireEvent.press(getByText("Sign In"));

    await waitFor(() => expect(getByText("Sign in failed!")).toBeTruthy());
  });

  test("shows popup on error during sign in", async () => {
    (signIn as jest.Mock).mockRejectedValue(new Error("API error"));

    const { getByPlaceholderText, getByText } = renderWithNavigation(
      <SignIn />
    );
    fireEvent.changeText(getByPlaceholderText("Name"), "John Doe");
    fireEvent.changeText(getByPlaceholderText("Email"), "john@example.com");
    fireEvent.changeText(getByPlaceholderText("Password"), "password123");
    fireEvent.press(getByText("Sign In"));

    await waitFor(() => expect(getByText("Sign in failed!")).toBeTruthy());
  });
});
