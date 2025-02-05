import { fireEvent, render, screen } from "@testing-library/react";
import { it, expect, describe } from "vitest";
import Sandbox from "./Sandbox";
import userEvent from "@testing-library/user-event";

describe("04-user-interactions", () => {
  render(<Sandbox />);
  it("checking if count is initially 0", () => {
    expect(
      screen.getByRole("heading", { level: 2, name: "Count: 0" })
    ).toBeInTheDocument();
  });
  it("if buttons exists", () => {
    render(<Sandbox />);
    expect(
      screen.getByRole("button", { name: /increase/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /decrease/i })
    ).toBeInTheDocument();
  });
  it("checking if increments and decrements works", () => {
    render(<Sandbox />);

    fireEvent.click(screen.getByRole("button", { name: /increase/i }));
    expect(screen.getByText(/count: 1/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /decrease/i }));
    expect(screen.getByText(/count: 0/i)).toBeInTheDocument();
  });
  it("should increment and decrement count using userEvent", async () => {
    render(<Sandbox />);
    const user = userEvent.setup();
    const increaseButton = screen.getByRole("button", { name: /increase/i });
    const decreaseButton = screen.getByRole("button", { name: /decrease/i });
    expect(screen.getByText(/count: 0/i)).toBeInTheDocument();

    await user.click(increaseButton);
    expect(screen.getByText(/count: 1/i)).toBeInTheDocument();
    await user.click(decreaseButton);
    expect(screen.getByText(/count: 0/i)).toBeInTheDocument();
  });
  it("toggles between unlike and like buttons when clicked", async () => {
    render(<Sandbox />);
    const user = userEvent.setup();
    const unlikeButton = screen.getByRole("button", { name: "unlike button" });
    expect(unlikeButton).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "like button" })
    ).not.toBeInTheDocument();

    await user.click(unlikeButton);

    const likeButton = screen.getByRole("button", { name: "like button" });
    expect(likeButton).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "unlike button" })
    ).not.toBeInTheDocument();
  });
});
