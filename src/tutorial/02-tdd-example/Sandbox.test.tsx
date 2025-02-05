import { render, screen } from "@testing-library/react";
import { it, expect, describe } from "vitest";
import Sandbox from "./Sandbox";

describe("02-tdd-example", () => {
  it("should render heading", () => {
    render(<Sandbox />);

    const heading = screen.getByText(/testing/i);
    expect(heading).toBeInTheDocument();
  });
});
