import { Poppins } from "next/font/google";
import React from "react";
import { Spinner } from "..";
import Styled from "./Style.module.scss";
import Button from "@mui/material/Button";

const poppins = Poppins({
  weight: ["600"],
  subsets: ["latin"],
  style: ["normal"],
  display: "swap",
});

type IButton = {
  /**
   * The content to be displayed inside the button.
   */
  children: React.ReactNode;

  /**
   * Determines if the button should be disabled.
   */
  disabled?: boolean;

  /**
   * Determines if the button should display a loading state.
   */
  loading?: boolean;

  /**
   * The custom CSS class name for the button.
   */
  className?: string;

  /**
   * The ref to the button element.
   */
  ref?: React.Ref<HTMLButtonElement>;

  /**
   * The event handler for the button's click event.
   */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;

  /**
   * The event handler for the button's mouse over event.
   */
  onMouseOver?: React.MouseEventHandler<HTMLButtonElement>;

  /**
   * The event handler for the button's mouse out event.
   */
  onMouseOut?: React.MouseEventHandler<HTMLButtonElement>;

  /**
   * The event handler for the button's mouse up event.
   */
  onMouseUp?: React.MouseEventHandler<HTMLButtonElement>;

  /**
   * The event handler for the button's mouse enter event.
   */
  onMouseEnter?: React.MouseEventHandler<HTMLButtonElement>;

  /**
   * The event handler for the button's mouse leave event.
   */
  onMouseLeave?: React.MouseEventHandler<HTMLButtonElement>;
};

/**
 * ### ButtonOutline
 *
 * Use this component to display an outline button on your page.
 *
 * @example
 * Here's a basic example of how to use the ButtonOutline:
 * ```tsx
 * <ButtonOutline onClick={onClick}>Click me</ButtonOutline>
 * ```
 */
const ButtonOutline = ({
  children,
  disabled,
  loading,
  //functions
  className,
  ref,
  onClick,
  onMouseOver,
  onMouseOut,
  onMouseUp,
  onMouseEnter,
  onMouseLeave,
}: IButton) => {
  const combinedClasses = `
  ${className}
  ${poppins.className}
  ${Styled.button}`.trim();

  return (
    <Button
      disabled={disabled}
      ref={ref}
      className={combinedClasses}
      onClick={onClick}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      onMouseUp={onMouseUp}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      variant="outlined"
    >
      <span className={`${loading ? Styled.label_hide : ""}`}>{children}</span>
      {loading && <Spinner micro className={Styled.spinner} />}
    </Button>
  );
};

export { ButtonOutline };
