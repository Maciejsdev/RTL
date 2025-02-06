import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import Form from "../Form";

export const getFormElements = () => {
  const emailInput = screen.getByRole("textbox", { name: /email/i });
  const ratingSelect = screen.getByRole("combobox", { name: /rating/i });
  const textArea = screen.getByRole("textbox", { name: /your review/i });
  const submitButton = screen.getByRole("button", { name: /submit/i });
  return { emailInput, ratingSelect, textArea, submitButton };
};

describe("Review Form", () => {
  const mockOnSubmit = vi.fn();
  beforeEach(() => {
    mockOnSubmit.mockClear();
  });
  it("renders form elements correctly", () => {
    render(<Form onSubmit={mockOnSubmit} />);
    const { emailInput, ratingSelect, submitButton, textArea } =
      getFormElements();
    expect(emailInput).toHaveValue("");
    expect(ratingSelect).toHaveValue("");
    expect(textArea).toHaveValue("");
    expect(submitButton).toBeInTheDocument();
  });
  it("shows error message when review is too short", async () => {
    const user = userEvent.setup();
    render(<Form onSubmit={mockOnSubmit} />);
    const { emailInput, ratingSelect, submitButton, textArea } =
      getFormElements();
    await user.type(emailInput, "test@example.com");
    await user.selectOptions(ratingSelect, "5");
    await user.type(textArea, "short");
    await user.click(submitButton);
    expect(
      screen.getByText(/review must be at least 10 characters long/i)
    ).toBeInTheDocument();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });
  it("submits form with valid data", async () => {
    const user = userEvent.setup();
    render(<Form onSubmit={mockOnSubmit} />);
    const { emailInput, ratingSelect, submitButton, textArea } =
      getFormElements();
    await user.type(emailInput, "test@example.com");
    await user.selectOptions(ratingSelect, "5");
    await user.type(textArea, "proper message");
    await user.click(submitButton);
    expect(
      screen.queryByText(/review must be at least 10 characters long/i)
    ).not.toBeInTheDocument();
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    expect(mockOnSubmit).toHaveBeenCalledWith({
      email: "test@example.com",
      rating: "5",
      text: "proper message",
    });
    expect(emailInput).toHaveValue("");
    expect(ratingSelect).toHaveValue("");
    expect(textArea).toHaveValue("");
  });
});
