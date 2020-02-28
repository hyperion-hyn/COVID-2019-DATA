import React, { Component } from "react";
import { Box, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core";

const styles = theme => ({
  root: {
    flex: 1
  }
});

class Main extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Typography component="div" className={classes.root}>
        <Box p={2}>Hello Hyperion!</Box>
      </Typography>
    );
  }
}

// const mapStateToProps = (state, onwProps) => ({
//   demoState: state.demo
// });

// const mapDispatchToProps = {
//   requestDemoData: DemoActions.requestDemoData
// };

//see https://react-redux.js.org/api/connect
export default connect()(withStyles(styles)(Main));
// mapStateToProps,
// mapDispatchToProps
