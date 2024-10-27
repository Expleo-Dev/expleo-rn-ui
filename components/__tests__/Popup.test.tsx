// Popup.test.tsx
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Popup from "../Popup";

describe("Popup Component", () => {
  test("renders the popup with the correct message", () => {
    const { getByText } = render(
      <Popup visible={true} message="Test Message" onClose={() => {}} />
    );

    // Check if the message is displayed
    expect(getByText("Test Message")).toBeTruthy();
  });

  test("does not render the popup when visible is false", () => {
    const { queryByText } = render(
      <Popup visible={false} message="Test Message" onClose={() => {}} />
    );

    // Check that the message is not displayed
    expect(queryByText("Test Message")).toBeNull();
  });

  test("calls onClose when the Close button is pressed", () => {
    const mockOnClose = jest.fn();
    const { getByText } = render(
      <Popup visible={true} message="Test Message" onClose={mockOnClose} />
    );

    // Simulate pressing the Close button
    fireEvent.press(getByText("Close"));

    // Check that onClose was called
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
