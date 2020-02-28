import React, { Component } from "react";
import { Box, Typography, Grid, AppBar, Toolbar } from "@material-ui/core";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core";
import MapGL from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const styles = theme => ({
  root: {
    backgroundColor: "#FF0000",
    width: "100vw",
    height: "100vh"
  },
  appBar: {},
  mainBoard: {
    height: "100%",
    width: "100%"
  },
  mapBox: {
    backgroundColor: "#cccccc",
    height: "100%"
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  virusBox: {
    width: "auto",
    height: "100%"
  },
  virusListBox: {
    backgroundColor: "#ffffff"
  },
  virusChartsBox: {
    backgroundColor: "#333333"
  }
});

class Main extends Component {
  state = {
    viewport: {
      latitude: 22.30511,
      longitude: 114.188488,
      zoom: 9,
      width: "100%",
      height: "100%"
    }
  };

  _onViewportChange = viewport => {
    viewport["width"] = "100%";
    viewport["height"] = "100%";
    this.setState({ viewport });
  };

  render() {
    const { classes } = this.props;
    const { viewport } = this.state;

    return (
      <Grid container direction="column" wrap="nowrap" className={classes.root}>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar variant="dense">
            <Typography className={classes.title}>
              全球疫情地图
            </Typography>
          </Toolbar>
        </AppBar>

        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
          wrap="nowrap"
          className={classes.mainBoard}
        >
          <Grid direction="column" item container className={classes.virusBox}>
            <Grid item xs className={classes.virusListBox}>
              <Box p={1}>virus list here</Box>
            </Grid>
            <Grid item className={classes.virusChartsBox}>
              <Box p={1}>
                <Typography color="primary">daily charts here</Typography>
              </Box>
            </Grid>
          </Grid>

          <Grid item className={classes.mapBox} xs>
            <MapGL
              {...viewport}
              mapStyle="https://cn.tile.map3.network/ncov_v1.json"
              onViewportChange={this._onViewportChange}
              mapOptions={{
                localIdeographFontFamily:
                  "'Noto Sans', 'Noto Sans CJK SC', sans-serif",
                attributionControl: false
              }}
            ></MapGL>
          </Grid>
        </Grid>
      </Grid>
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
