import {extendTheme} from "@chakra-ui/react";

import {semanticTokens} from "./tokens";
import {styles} from "./styles";
import {textStyles} from "./text";
import {components} from "./components";

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

export const theme = extendTheme({
  config,
  styles,
  textStyles,
  semanticTokens,
  components,
});
