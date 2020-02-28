import React, { Component } from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core";

import { DemoActions } from "../../actions";

const styles = theme => ({
  root: {
    flex: 1,
    backgroundColor: "#e8e8e8"
  }
});

class DemoMain extends Component {
  _onRequestDemoDataClick = () => {
    const { requestDemoData } = this.props;
    requestDemoData();
  };

  render() {
    const { classes, demoState } = this.props;
    return (
      <Typography component="div" className={classes.root}>
        <Box p={2}>
          <Box fontSize="h6.fontSize">hello demo</Box>
          <Box>data: {demoState.data}</Box>
          <Box>msg: {demoState.msg}</Box>
          <Box>status: {demoState.status}</Box>
          <Button
            variant="contained"
            color="primary"
            onClick={this._onRequestDemoDataClick}
          >
            Request Demo Data
          </Button>
        </Box>
      </Typography>
    );
  }
}

const mapStateToProps = (state, onwProps) => ({
  demoState: state.demo
});

const mapDispatchToProps = {
  requestDemoData: DemoActions.requestDemoData
};

//see https://react-redux.js.org/api/connect
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(DemoMain));
