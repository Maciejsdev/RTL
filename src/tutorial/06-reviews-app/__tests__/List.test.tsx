import { render, screen } from "@testing-library/react";
import { it, expect, describe } from "vitest";
import List from "../List";
import { Review } from "../Sandbox";

const mockReviews: Review[] = [
  {
    email: "test@example.com",
    rating: "4",
    text: "Great product!",
  },
  {
    email: "user@example.com",
    rating: "5",
    text: "Excellent service",
  },
];

describe("List Component", () => {
  it("renders heading", () => {
    render(<List reviews={mockReviews} />);
    expect(
      screen.getByRole("heading", { level: 2, name: /reviews/i })
    ).toBeInTheDocument();
  });
  it('displays "No reviews yet" when reviews array is empty', () => {
    render(<List reviews={[]} />);
    expect(screen.getByText("No reviews yet")).toBeInTheDocument();
  });
  it("renders reviews correctly when provided", () => {
    render(<List reviews={mockReviews} />);
    mockReviews.forEach((review) => {
      expect(screen.getByText(review.email)).toBeInTheDocument();
      expect(screen.getByText(review.text)).toBeInTheDocument();
      const stars = "⭐".repeat(Number(review.rating));
      expect(screen.getByText(stars)).toBeInTheDocument();
    });
  });
});
