import React from 'react';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import {lightBlue, green} from "@material-ui/core/colors";

// A theme with custom primary and secondary color.
// It's optional.
const theme = createMuiTheme({
  palette: {
    // primary: {
    //   light: lightBlue[300],
    //   main: lightBlue[500],
    //   dark: lightBlue[700],
    // },
    // secondary: {
    //   light: green[300],
    //   main: green[500],
    //   dark: green[700],
    // },
  },
  typography: {
    useNextVariants: true,
  },
});

function withMuiTheme(Component) {
  function WithRoot(props) {
    // MuiThemeProvider makes the theme available down the React tree
    // thanks to React context.
    return (
      <MuiThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline/>
        <Component {...props} />
      </MuiThemeProvider>
    );
  }

  return WithRoot;
}

export default withMuiTheme;