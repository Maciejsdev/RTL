import { render, screen } from "@testing-library/react";
import { it, expect, describe } from "vitest";
import Sandbox from "./Sandbox";

describe("01-search-by-text", () => {
  it("demonstrates different query methods", async () => {
    render(<Sandbox />);
    screen.debug();

    const phoneRegex = /\d{3}-\d{3}-\d{4}/;
    const phoneText = screen.getByText(phoneRegex);
    expect(phoneText).toBeInTheDocument();

    expect(screen.queryByText("Error message")).not.toBeInTheDocument();

    const items = screen.getAllByText(/item/i);
    expect(items).toHaveLength(4);

    const asyncMessage = await screen.findByText("Async message");
    expect(asyncMessage).toBeInTheDocument();
  });
});
