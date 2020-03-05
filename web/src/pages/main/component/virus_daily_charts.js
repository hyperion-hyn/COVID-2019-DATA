import React, { Component } from "react";
import Simple from "../demo_charts/simple";
import { withStyles, Box, Typography } from "@material-ui/core";

const styles = theme => ({
  root: {
    width: "100%",
    height: "100%",
    backgroundColor: "white"
  }
});

class VirusDailyPanel extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Box className={classes.root}>
        <Box pl={2} pt={1}>
          <Typography style={{ fontSize: 18 }}>韩国情势:</Typography>
        </Box>
        <Simple></Simple>
        <Simple></Simple>
      </Box>
    );
  }
}

export default withStyles(styles)(VirusDailyPanel);
