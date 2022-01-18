import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    purple: {
      600: "#8243B3",
      500: "#944CCD",
    },
    teal: {
      600: "#43B3AC",
      500: "#4DCCC4",
    },
    red: {
      600: "#DF5552",
      500: "#FF615E",
    },
    yellow: {
      600: "#ECA721",
      500: "#FFB524",
    },
    gray: {
      200: "#F1F3F5",
      300: "#DEE2E6",
      400: "#ADB5BD",
      500: "#868E96",
      600: "#212529",
      800: "#343A40",
    },
  },
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
        fontSize: "93.75%",
        overflowY: "hidden",
      },
      "*": {
        boxSizing: "border-box",
      },
      a: {
        outline: "none",
      },
      [`@media screen and (max-width: 1366px)`]: {
        html: {
          fontSize: "87.5%",
        },
      },
    },
  },
});

export default theme;
