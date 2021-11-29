import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {},
  styles: {
    global: {
      "html, body": {
        margin: 0,
        padding: 0,
      },
      "*": {
        boxSizing: "border-box",
      },
      a: {
        outline: "none",
      },
    },
  },
});

export default theme;
