import { render, screen } from "@testing-library/react";
import { it, expect, describe } from "vitest";
import Sandbox from "./Sandbox";
import userEvent, { UserEvent } from "@testing-library/user-event";

const getFormElements = () => {
  const elements = {
    emailInputElement: screen.getByRole("textbox", { name: /email/i }),
    passwordInputElement: screen.getByLabelText("Password"),
    confirmPasswordElement: screen.getByLabelText(/confirm password/i),
    submitButton: screen.getByRole("button", { name: /submit/i }),
  };
  return elements;
};
describe("05-form-testing", () => {
  let user: UserEvent;
  beforeEach(() => {
    user = userEvent.setup();
    render(<Sandbox />);
  });

  it("inputs should be initially empty", () => {
    const { emailInputElement, passwordInputElement, confirmPasswordElement } =
      getFormElements();

    expect(emailInputElement).toHaveValue("");

    expect(passwordInputElement).toHaveValue("");

    expect(confirmPasswordElement).toHaveValue("");
  });
  test("should be able to type in the input", async () => {
    const { emailInputElement, passwordInputElement, confirmPasswordElement } =
      getFormElements();

    await user.type(emailInputElement, "test@test.com");
    expect(emailInputElement).toHaveValue("test@test.com");

    await user.type(passwordInputElement, "secret");
    expect(passwordInputElement).toHaveValue("secret");

    await user.type(confirmPasswordElement, "secret");
    expect(confirmPasswordElement).toHaveValue("secret");
  });
  it("should show email error if email is invalid", async () => {
    const { emailInputElement, submitButton } = getFormElements();

    expect(screen.queryByText(/invalid email/i)).not.toBeInTheDocument();
    await user.type(emailInputElement, "invalid");
    await user.click(submitButton);
    expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
  });
  it("should show password error if password is less than 5 characters", async () => {
    const { emailInputElement, submitButton, passwordInputElement } =
      getFormElements();

    expect(
      screen.queryByText(/password must be at least 5 characters/i)
    ).not.toBeInTheDocument();
    await user.type(emailInputElement, "test@test.com");
    await user.type(passwordInputElement, "abcd");
    await user.click(submitButton);
    expect(
      screen.getByText(/password must be at least 5 characters/i)
    ).toBeInTheDocument();
  });
  it("should show password error if password doesn't match", async () => {
    const {
      emailInputElement,
      submitButton,
      passwordInputElement,
      confirmPasswordElement,
    } = getFormElements();
    const errorMsg = /passwords do not match/i;
    expect(screen.queryByText(errorMsg)).not.toBeInTheDocument();
    await user.type(emailInputElement, "test@test.com");
    await user.type(passwordInputElement, "secret");
    await user.type(confirmPasswordElement, "notsecret");
    await user.click(submitButton);
    expect(screen.getByText(errorMsg)).toBeInTheDocument();
  });
  it("valid inputs show no errors and clear fields", async () => {
    const {
      emailInputElement,
      submitButton,
      passwordInputElement,
      confirmPasswordElement,
    } = getFormElements();

    await user.type(emailInputElement, "test@test.com");
    await user.type(passwordInputElement, "secret");
    await user.type(confirmPasswordElement, "secret");
    await user.click(submitButton);

    expect(screen.queryByText(/invalid email/i)).not.toBeInTheDocument();
    expect(
      screen.queryByText(/password must be at least 5 characters/i)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/passwords do not match/i)
    ).not.toBeInTheDocument();

    expect(emailInputElement).toHaveValue("");
    expect(passwordInputElement).toHaveValue("");
    expect(confirmPasswordElement).toHaveValue("");
  });
});
