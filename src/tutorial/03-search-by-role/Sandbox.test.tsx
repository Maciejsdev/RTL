import { render, screen } from "@testing-library/react";
import { it, expect, describe } from "vitest";
import Sandbox from "./Sandbox";

describe("03-search-by-role", () => {
  it("renders nav and navigation links", () => {
    render(<Sandbox />);

    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "About" })).toBeInTheDocument();
  });
  it("renders headings with correct hierarchy", () => {
    render(<Sandbox />);
    expect(screen.getByRole("heading", { name: "Main Heading", level: 1 }));
    expect(screen.getByRole("heading", { level: 2 }));
  });
  it("renders image with alt text", () => {
    render(<Sandbox />);
    expect(screen.getByRole("img", { name: "Example" })).toBeInTheDocument();
  });
  it("renders initial buttons", () => {
    render(<Sandbox />);
    expect(
      screen.getByRole("button", { name: "Click me" })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
  });
  it("error button is not initially visible", () => {
    render(<Sandbox />);
    expect(
      screen.queryByRole("button", { name: "Error" })
    ).not.toBeInTheDocument();
  });
  it("async button appears after delay", async () => {
    render(<Sandbox />);

    expect(
      screen.queryByRole("button", { name: /async button/i })
    ).not.toBeInTheDocument();
    expect(
      await screen.findByRole("button", { name: /async button/i })
    ).toBeInTheDocument();
  });
});
