import React, { Component, createRef } from "react";
import {
  Box,
  Typography,
  Grid,
  AppBar,
  Toolbar,
  ButtonBase,
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
import VirusDailyPanel from "./component/virus_daily_charts";
import LanguageIcon from "@material-ui/icons/Language";

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
    // backgroundColor: "#FF0000",
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
    width: 400,
    height: "100%",
    overflow: "hidden"
  },
  virusBoxItem1: {
    width: "100%"
    // overflow: 'scroll'
    // maxHeight: '60%'
    // padding: theme.spacing(1),
    // height: 420
    // overflow: 'hidden',
  },
  virusBoxItem2: {
    width: "100%",
    // padding: theme.spacing(1),
    // overflow: 'hidden',
    height: 400
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
  languageButton: {
    marginRight: theme.spacing(2)
  },
  languageText: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
    fontSize: "14px"
  },
  githubIcon: {
    width: "24px",
    height: "24px"
  },
  addVirusBox: {
    margin: "auto",
    width: "100%",
    position: "absolute",
    display: "flex",
    "justify-content": "center",
    top: "1rem"
  },
  addVirusButton: {
    padding: theme.spacing(1)
  },
  addVirusTip: {
    color: "white",
    textShadow: "1px 1px 2px blue"
    // ['-webkit-text-stroke']: '1px grey'
  },
  addingMarkTip: {
    color: "blue",
    cursor: "pointer"
  },
  uploadVirusPanelGrid: {
    width: 370,
    height: "80%",
    backgroundColor: "#ffffff",
    top: "1rem",
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
    addingMaker: undefined,
    isShowPanel:false,
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
    const minZoom = 15;
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
    const { viewport, addingMaker,isShowPanel } = this.state;

    return (
      <Grid container direction="column" wrap="nowrap" className={classes.root}>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h5" className={classes.title}>
              全球疫情地图
            </Typography>

            <ButtonBase
              variant="contained"
              color="default"
              className={classes.languageButton}
            >
              <LanguageIcon />
              <Typography className={classes.languageText}>简体中文</Typography>
            </ButtonBase>

            <svg aria-hidden="true" className={classes.githubIcon}>
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
          <Grid
            direction="column"
            item
            container
            wrap="nowrap"
            className={classes.virusBox}
          >
            <Grid item xs className={classes.virusBoxItem1}>
              <VirusStatusPanel></VirusStatusPanel>
            </Grid>

            <Box
              style={{
                backgroundColor: "#ccc",
                height: 1,
                marginTop: 4,
                marginBottom: 4
              }}
            ></Box>

            <Grid item className={classes.virusBoxItem2}>
              <VirusDailyPanel ></VirusDailyPanel>
            </Grid>
          </Grid>

          <Grid item xs container className={classes.mapBox} justify="center">
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
                trackUserLocation={false}
                showUserLocation={true}
              />

              {this._renderAddNewMaker()}
              {this._renderAddNewPopup()}

              <Box className={classes.addVirusBox}>
                <ButtonBase
                  onClick={this._onAddVirus}
                  className={classes.addVirusButton}
                >
                  <Typography variant="h6" className={classes.addVirusTip}>
                    点击此处上报疫情信息
                  </Typography>
                </ButtonBase>s
              </Box>
              {this._uploadPanelView(isShowPanel)}
            </MapGL>
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
            onClick={()=>{this.updateUploadPanelState(true)}}
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

  _uploadPanelView(isShowPanel) {
    const { classes } = this.props;
    const { addingMaker } = this.state;
    if (isShowPanel) {
      return addingMaker && (
        <Box className={classes.addVirusBox}>
          <Grid className={classes.uploadVirusPanelGrid}>
            <UploadVirusPanel
              childLatitude={addingMaker.latitude}
              childLongitude={addingMaker.longitude}
              callbackParent={(isShow) => {
                this.setState({ addingMaker: undefined });
                this.updateUploadPanelState(isShow);
                }}>
            </UploadVirusPanel>
          </Grid>
        </Box>
      )
    }

  }

  updateUploadPanelState(isShowPanel) {
    this.setState({isShowPanel:isShowPanel})
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
