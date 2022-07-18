import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  styles: {
    global: () => ({
      body: {
        bgGradient: "linear(to bottom, #09203f 0%, #537895 100%)",
        color: "gray.100",
      },
    }),
  },
  components: {
    Input: {
      baseStyle: {
        field: {
          bg: "none",
          color: "gray.300",
          _hover: {
            bg: "none",
          },
          _focus: {
            bg: "none",
          },
          _autofill: {
            border: "1px solid transparent",
            textFillColor: "#c6c6c6",
            boxShadow: "0 0 0px 1000px #232323 inset",
            transition: "background-color 5000s ease-in-out 0s",
          },
        },
      },
    },
  },
});
