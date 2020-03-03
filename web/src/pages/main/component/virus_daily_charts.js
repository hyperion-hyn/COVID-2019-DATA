import React, { Component } from "react";
import Simple from "../demo_charts/simple";
import { withStyles } from "@material-ui/core";

const styles = theme => ({});

class VirusDailyPanel extends Component {
  render() {
    return <Simple></Simple>;
  }
}

export default withStyles(styles)(VirusDailyPanel);
