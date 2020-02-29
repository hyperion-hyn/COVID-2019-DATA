import React, { Component } from "react";
import { withStyles, Grid, Box } from "@material-ui/core";

const styles = theme => ({
  virusListBox: {
    backgroundColor: "#ffffff"
  }
});

class VirusStatusPanel extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Grid item xs className={classes.virusListBox}>
        <Box p={1}>virus list here !</Box>
      </Grid>
    );
  }
}

export default withStyles(styles)(VirusStatusPanel);
