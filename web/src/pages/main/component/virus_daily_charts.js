import React, { Component } from "react";
import Charts from "./charts";
import { withStyles, Box, Typography } from "@material-ui/core";
import { connect } from "react-redux";

const styles = theme => ({
  root: {
    width: "100%",
    height: "100%",
    backgroundColor: "white"
  }
});

class VirusDailyPanel extends Component {
  render() {

    const { classes, dailyData } = this.props;

    console.log(
      "virusData.data result  " +
        " daily data: mock_virus_status_daily_tick===" +
        JSON.stringify(dailyData)
    );

    return (
      <Box className={classes.root}>
        <Box pl={2} pt={1}>
          <Typography style={{ fontSize: 14 }}>韩国情势:</Typography>
        </Box>
        <Charts dailyData={dailyData}></Charts>
      </Box>
    );
  }
}

const mapStateToProps = (state, onwProps) => ({
  dailyData: state.virusDailyReducer
});


export default connect(
  mapStateToProps,
)(withStyles(styles)(VirusDailyPanel));