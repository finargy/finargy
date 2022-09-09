import {Button as ChakraComponent} from "@chakra-ui/react";

export const Button = {
  // Example:
  // variants: {
  //   outline: {
  //     borderColor: "border-contrast-xl",
  //     _hover: {
  //       bg: "bg-contrast-md",
  //     },
  //     _active: {
  //       bg: "bg-contrast-xl",
  //     },
  //     _disabled: {
  //       bg: "bg-contrast-md",
  //     },
  //   },
  // },
};

ChakraComponent.defaultProps = {
  ...ChakraComponent.defaultProps,
  fontSize: "lg",
  variant: "outline",
};
