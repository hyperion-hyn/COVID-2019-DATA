import React, { Component } from "react";
// import { withStyles, Grid, Box } from "@material-ui/core";
import { Grid, Box, Typography, ListItemText, List, TextField, Input } from "@material-ui/core";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core";
// import { makeStyles } from '@material-ui/core/styles';


import { DemoActions } from "../../../actions/demo_action"
import { VirusStatusActions } from "../../../actions/virus_status"
import { VirusStatusModel } from "../../../data/model"

import { makeStyles } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';


const styles = theme => ({
  virusListBox: {
    backgroundColor: "#ffffff"
  },
  virusListStyle: {
    height: 300,
    width: "100%"
  },
});

class VirusStatusPanel extends Component {
  constructor(props) {
    super(props);
    const { requestVirusData } = this.props;
    requestVirusData();

    this.state = { value: '' };
    this.handleChange = this.handleChange.bind(this);
  };

  handleChange(event) {
    event.preventDefault();
    this.setState({ value: event.target.value });
  };

  render() {
    const { classes, virusData, requestVirusDialyData, dialyData } = this.props;

    const inputStyle = {
      border: '1px solid grey',
      padding: '10px',
    }

    let inputValue = this.state.value;

    let newArray = virusData.data;
    if (virusData.data && inputValue != "") {
      newArray = virusData.data.filter(item => (item.area.match(inputValue)));
    }
    console.log("virusData.data result  " + newArray
     + " daily data: mock_virus_status_daily_tick===" +  JSON.stringify(dialyData))

    return (
      <Grid item xs className={classes.virusListBox}>
        <Typography style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-end' }}>
          <Box pl={2} fontSize={20}>疫情统计</Box>
          <Box pl={2} fontSize={15} style={{ color: '#4F4F4F' }}>更新时间 </Box>
        </Typography>
        <form onSubmit={this.handleChange}>
          <TextField variant="outlined" onChange={this.handleChange} value={inputValue} placeholder="搜索国家/地区" />
        </form>

        <TableContainer component={Paper} className={classes.virusListStyle}>
          <Table  scroll={{ x: 1200}} className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>国家/地区</TableCell>
                <TableCell align="right">新增</TableCell>
                <TableCell align="right">确诊</TableCell>
                <TableCell align="right">康复</TableCell>
                <TableCell align="right">死亡</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {newArray && newArray.map(row => (
                <TableRow onClick={(rowEntity) => {
                  console.log("tabletable" + row.area);
                  requestVirusDialyData();
                }} key={row.area}>
                  <TableCell component="th" scope="row">
                    {row.area}
                  </TableCell>
                  <TableCell align="right">{row.newConfirmed}</TableCell>
                  <TableCell align="right">{row.totalConfirmed}</TableCell>
                  <TableCell align="right">{row.totalRecovered}</TableCell>
                  <TableCell align="right">{row.totalDead}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    );
  }


}

const mapStateToProps = (state, onwProps) => ({
  virusData: state.virusStatusReducer,
  dialyData: state.virusDailyReducer
});

const mapDispatchToProps = {
  requestVirusData: VirusStatusActions.fetchVirusData,
  requestVirusDialyData: VirusStatusActions.fetchDailyVirus,
};

// export default withStyles(styles)(VirusStatusPanel);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(VirusStatusPanel));
