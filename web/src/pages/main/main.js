import React, { Component, createRef } from "react";
import {
  Box,
  Typography,
  Grid,
  AppBar,
  Toolbar,
  Icon,
  SvgIcon
} from "@material-ui/core";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core";
import MapGL, { GeolocateControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import VirusStatusPanel from "./component/virus_status_panel";

import IconFont from "react-iconfonts";

// function HomeIcon(props) {
//   return (
//     <SvgIcon {...props}>
//       <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
//     </SvgIcon>
//   );
// }

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
    width: "auto"
  },
  virusListBox: {
    backgroundColor: "#ffffff"
  },
  virusChartsBox: {
    backgroundColor: "#333333"
  },
  languageIcon: {
    width: "16px",
    height: "16px",
    fill: "currentColor",
    marginRight: "4px"
  },
  languageText: {
    marginRight: "16px",
    fontSize: "12px"
  },
  githubIcon: {
    width: "24px",
    height: "24px"
  },
  addVirusTip: {
    position: "fixed",
    top: "4rem",
    color: "white",
    textShadow: "1px 1px 2px blue"
    // ['-webkit-text-stroke']: '1px grey'
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

  geolocateStyle = {
    position: "absolute",
    right: 0,
    bottom: 0,
    margin: 32
  };

  _geolocateButtonRef = createRef();

  _onViewportChange = viewport => {
    viewport["width"] = "100%";
    viewport["height"] = "100%";
    this.setState({ viewport });
  };

  componentDidMount() {
    console.log("xxx did mount");
  }

  render() {
    const { classes } = this.props;
    const { viewport } = this.state;

    return (
      <Grid container direction="column" wrap="nowrap" className={classes.root}>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar variant="dense">
            <Typography variant="h6" className={classes.title}>
              全球疫情地图
            </Typography>
            <svg
              // class="icon"
              aria-hidden="true"
              className={classes.languageIcon}
            >
              <use xlinkHref="#iconyuyan"></use>
            </svg>
            <Typography className={classes.languageText}>简体中文</Typography>
            <svg
              //  class="icon"
              aria-hidden="true"
              className={classes.githubIcon}
            >
              <use xlinkHref="#icongit-copy"></use>
            </svg>
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
            <VirusStatusPanel></VirusStatusPanel>
            <Grid item className={classes.virusChartsBox}>
              <Box p={1}>
                <Typography color="primary">daily charts here</Typography>
              </Box>
            </Grid>
          </Grid>

          <Grid item container className={classes.mapBox} xs justify="center">
            <MapGL
              {...viewport}
              mapStyle="https://cn.tile.map3.network/ncov_v1.json"
              onViewportChange={this._onViewportChange}
              mapOptions={{
                localIdeographFontFamily:
                  "'Noto Sans', 'Noto Sans CJK SC', sans-serif",
                attributionControl: false
              }}
            >
              <GeolocateControl
                style={this.geolocateStyle}
                positionOptions={{ enableHighAccuracy: true }}
                trackUserLocation={true}
                showUserLocation={true}
              />
            </MapGL>

            <Typography variant="h6" className={classes.addVirusTip}>
              长按地图位置添加疫情信息
            </Typography>
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
