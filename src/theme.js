import { createTheme } from "@mui/material";

const theme = createTheme({
  // palette: {
  //   primary: {
  //     main: "#009788",
  //   },
  // },
  typography: {
    display: {
      fontSize: "4rem",
      fontWeight: "bold",
      marginBottom: "0.5rem",
    },
    h1: {
      fontSize: "2rem",
      fontWeight: "bold",
      marginBottom: "0.5rem",
    },
    h2: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      marginBottom: "0.5rem",
    },
    h3: {
      fontSize: "1.25rem",
      fontWeight: "bold",
      marginBottom: "0.5rem",
    },
    h4: {
      fontSize: "1rem",
      fontWeight: "bold",
      marginBottom: "0.5rem",
    },
  },
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          display: "h1",
        },
      },
    },
  },
});

export default theme;
