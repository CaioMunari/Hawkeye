import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {},
  fonts: {
    heading: "Khand, sans-serif ",
    body: "Inter, sans-serif",
    button: "Inter, sans-serif",
  },
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
