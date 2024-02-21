import classNames from "classnames";
import { ComponentPropsWithRef } from "react";

interface ButtonProps extends ComponentPropsWithRef<"button"> {}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  onClick,
  ...props
}) => {
  return (
    <button
      className={classNames("btn", className)}
      onClick={onClick}
      {...props}>
      {children}
    </button>
  );
};
