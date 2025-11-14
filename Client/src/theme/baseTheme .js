const baseTheme = {
  typography: {
    fontFamily: "'Inter', 'Roboto', sans-serif",
    h5: {
      fontWeight: 600,
    },
    body1: {
      color: "#444",
    },
  },

  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.05)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
        },
        containedPrimary: {
          color: "#fff",
        },
      },
    },
  },
};

export default baseTheme;
