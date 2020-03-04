import React, { Component, createRef } from "react";
import {
  Box,
  Typography,
  Grid,
  AppBar,
  Toolbar,
  Button
} from "@material-ui/core";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core";
import MapGL, {
  GeolocateControl,
  Marker,
  FlyToInterpolator,
  Popup
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import VirusStatusPanel from "./component/virus_status_panel";
import UploadVirusPanel from "./component/upload_virus_panel";
import Pin from "./component/pin";
import { easeCubic } from "d3-ease";

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
  },
  addingMarkTip: {
    color: "blue",
    cursor: "pointer"
  },
  uploadVirusPanel: {
    height: "80%",
    width: 370,
    backgroundColor: "#ffffff",
    position: "fixed",
    top: "4rem",
  },
});

class Main extends Component {
  state = {
    viewport: {
      latitude: 23.10901,
      longitude: 113.31799,
      zoom: 7.2,
      width: "100%",
      height: "100%"
    },
    addingMaker: undefined
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

  _onAddVirus = () => {
    let viewport = {
      ...this.state.viewport
    };
    const minZoom = 16;
    if (this.state.viewport.zoom < minZoom) {
      viewport.zoom = minZoom;
      viewport.transitionDuration = 1000;
      viewport.transitionInterpolator = new FlyToInterpolator();
      viewport.transitionEasing = easeCubic;
    }

    let addingMaker = {
      latitude: viewport.latitude,
      longitude: viewport.longitude,
      message: "点击编辑疫情信息"
    };

    this.setState({ viewport, addingMaker });
  };

  _onMarkerDrag = event => {
    if (this.state.addingMaker) {
      let addingMaker = {
        ...this.state.addingMaker
      };
      addingMaker.latitude = event.lngLat[1];
      addingMaker.longitude = event.lngLat[0];
      this.setState({ addingMaker });
    }
  };

  _onCloseAdding = () => {
    this.setState({ addingMaker: undefined });
  };

  componentDidMount() {
    setTimeout(() => {
      // this._geolocateButtonRef.current._onClickGeolocate();
    }, 1000);
  }

  render() {
    const { classes } = this.props;
    const { viewport, addingMaker } = this.state;

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
                ref={this._geolocateButtonRef}
                positionOptions={{ enableHighAccuracy: true }}
                trackUserLocation={true}
                showUserLocation={true}
              />

              {this._renderAddNewMaker()}
              {this._renderAddNewPopup()}
            </MapGL>

            <Button onClick={this._onAddVirus}>
              <Typography variant="h6" className={classes.addVirusTip}>
                点击此处上报疫情信息
              </Typography>
            </Button>
            {/* <Box className={classes.uploadVirusPanel}>
              <UploadVirusPanel abc={"enen"} callbackParent={this._uploadPanelCallback}>
              </UploadVirusPanel>
            </Box> */}
          </Grid>
        </Grid>
      </Grid>
    );
  }

  _renderAddNewMaker() {
    const { addingMaker } = this.state;
    return (
      addingMaker && (
        <Marker
          longitude={addingMaker.longitude}
          latitude={addingMaker.latitude}
          offsetTop={-48}
          offsetLeft={-24}
          draggable
          onDragEnd={this._onMarkerDrag}
          onDrag={this._onMarkerDrag}
        >
          <Pin size={48} />
        </Marker>
      )
    );
  }

  _renderAddNewPopup() {
    const { addingMaker } = this.state;
    const { classes } = this.props;
    return (
      addingMaker && (
        <Popup
          longitude={addingMaker.longitude}
          latitude={addingMaker.latitude}
          onClose={this._onCloseAdding}
          closeOnClick={false}
          offsetTop={-56}
        // offsetLeft={-24}
        >
          <Box
            onClick={() => {
              console.log("TODO xxx edit point");
            }}
          >
            <Typography color="textSecondary">
              拖动标记到疫情发生位置
            </Typography>
            <Typography color="primary" className={classes.addingMarkTip}>
              {addingMaker.message}
            </Typography>
          </Box>
        </Popup>
      )
    );
  }

  _uploadPanelCallback(callBack) {
    console.log("child call = " + callBack);
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
