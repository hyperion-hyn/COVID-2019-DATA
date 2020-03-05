import React, { Component } from "react";
import { Grid, Box, Typography, InputBase } from "@material-ui/core";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core";
import { VirusStatusActions } from "../../../actions/virus_status";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Table from "@material-ui/core/Table";

import SearchIcon from "@material-ui/icons/Search";
import { FormattedMessage } from "react-intl";


const styles = theme => ({
  root: {
    backgroundColor: "#ffffff",
    height: "100%"
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  iconButton: {
    padding: 10
  },
  divider: {
    height: 28,
    margin: 4
  }
});

class VirusStatusPanel extends Component {
  constructor(props) {
    super(props);
    const { requestVirusData } = this.props;
    requestVirusData();

    this.state = { value: "", listValue: [], filter: undefined,times:0 };
    this.handleChange = this.handleChange.bind(this);
  }

  timeout = null;

  handleChange(event) {
    event.preventDefault();
    this.setState({ value: event.target.value });
  }

  handleSelectVirus(id) {
    
    const selectedIndex = this.state.listValue.indexOf(id);
    let newSelectedVirus = [];

    if (selectedIndex === -1) {
      newSelectedVirus = newSelectedVirus.concat(id);
    } else if (selectedIndex === 0) {
      newSelectedVirus = newSelectedVirus.concat(id);
    }
    this.setState({ listValue: newSelectedVirus });
  }

  _onFilterChange = value => {
    const filter = value.currentTarget.value;

    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    if (!filter) {
      this.setState({ filter });
    } else {
      this.timeout = setTimeout(() => {
        this.setState({ filter });
      }, 1000);
    }
  };

  render() {

    const { classes, virusData, requestVirusDailyData, dailyData } = this.props;
    const { filter,times } = this.state;

    let inputValue = this.state.value;
    var tableSelectValue = this.state.listValue;

    let newArray = [];
    let virusUpdateTime = "";
    if (virusData.data && inputValue !== "") {
      newArray = virusData.data.virusList.filter(item =>
        item.area.match(inputValue)
      );
      virusUpdateTime = virusData.data.virusUpdateTime;
    } else if (virusData.data) {
      newArray = virusData.data.virusList;
      virusUpdateTime = virusData.data.virusUpdateTime;
      if (tableSelectValue.length === 0 && newArray && newArray[0]) {
        tableSelectValue = [newArray[0].area];
      }
    }

    return (
      <Grid
        container
        wrap="nowrap"
        direction="column"
        container
        wrap="nowrap"
        className={classes.root}
      >
        <Grid item>
          <Box
            pl={2}
            pr={2}
            pt={1}
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "flex-end",
              marginTop: 4
            }}
          >
            <Typography variant="h6">
              <FormattedMessage id="virus_stat" />
            </Typography>
            <Box ml={2}></Box>
            <Typography variant="subtitle2" style={{ color: "grey" }}>
              更新时间：{virusUpdateTime}
            </Typography>
          </Box>
        </Grid>

        <Box
          style={{
            backgroundColor: "#cccccc",
            height: 0.5,
            marginTop: 6,
            marginBottom: 4
          }}
        ></Box>

        <Grid item container alignItems="center">
          <SearchIcon style={{ color: "grey", marginLeft: "1rem" }} />
          <InputBase
            className={classes.input}
            placeholder="过滤国家/地区"
            inputProps={{ "aria-label": "filter" }}
            onChange={this._onFilterChange}
          />
        </Grid>

        <Box
          style={{
            backgroundColor: "#cccccc",
            height: 1,
            marginTop: 4,
            marginBottom: 2
          }}
        ></Box>

        <Grid item xs style={{ overflowY: "scroll" }}>
          <TableContainer>
            <Table size="small" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>国家/地区</TableCell>
                  <TableCell align="center">新增</TableCell>
                  <TableCell align="center">确诊</TableCell>
                  <TableCell align="center">康复</TableCell>
                  <TableCell align="center">死亡</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {newArray &&
                  newArray
                    .filter(row => {
                      if (!filter) {
                        return true;
                      }
                      return row.area.indexOf(filter) >= 0;
                    })
                    .map(row => (
                      <TableRow
                        hover
                        onClick={(rowEntity, event) => {
                          console.log('[virus_status_panel] --> click: ' + row.area);
                          requestVirusDailyData(row.area);
                          this.handleSelectVirus(row.area);
                        }}
                        key={row.area}
                        selected={tableSelectValue.indexOf(row.area) !== -1}
                      >
                        <TableCell component="th" scope="row" size="small">
                          {row.area}
                        </TableCell>
                        <TableCell size="small" align="center">
                          {row.newConfirmed}
                        </TableCell>
                        <TableCell size="small" align="center">
                          {row.totalConfirmed}
                        </TableCell>
                        <TableCell size="small" align="center">
                          {row.totalRecovered}
                        </TableCell>
                        <TableCell size="small" align="center">
                          {row.totalDead}
                        </TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state, onwProps) => ({
  virusData: state.virusStatusReducer,
  dailyData: state.virusDailyReducer,
  area: state.tableSelectValue
});

const mapDispatchToProps = {
  requestVirusData: VirusStatusActions.fetchVirusData,
  requestVirusDailyData: VirusStatusActions.fetchDailyVirus
};

// export default withStyles(styles)(VirusStatusPanel);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(VirusStatusPanel));
