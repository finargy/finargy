import {Link as ChakraComponent} from "@chakra-ui/react";

export const Link = {
  baseStyle: {
    _hover: {
      textDecoration: "none",
    },
  },
};

ChakraComponent.defaultProps = {
  ...ChakraComponent.defaultProps,
};
