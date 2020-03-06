import React, { Component, createRef } from "react";
import {
  Box,
  Typography,
  Grid,
  AppBar,
  Toolbar,
  ButtonBase,
  FormControl,
  Select,
  MenuItem,
  InputBase,
  CircularProgress
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
import { FormattedMessage } from "react-intl";

import { LangaugeActions } from "../../actions/language";
import { supportedLocales } from "../../locale";
import { VirusStatusActions } from "../../actions";
import Status from "../../config/status";

const BootstrapInput = withStyles(theme => ({
  input: {
    color: "white",
    position: "relative",
    fontSize: 16,
    width: "auto",
    minWidth: "64px",
    textAlign: "center"
  }
}))(InputBase);

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
  clickableTip: {
    cursor: "pointer"
  },
  uploadVirusPanelGrid: {
    width: 370,
    height: "80%",
    top: "1rem"
  },
  uploadVirusPanelBox: {
    margin: "auto",
    width: "100%",
    position: "absolute",
    display: "flex",
    "justify-content": "center",
    top: "1rem",
  },
  languageFormControl: {
    margin: 8,
    paddingTop: 4
  }
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
    isShowPanel: false,
    areaValue: "",
    locales: {
      open: false
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

  _onMapClick = event => {
    const feature = event.features[0];
    if (feature) {
      const pid = feature.properties["pid"];
      const lat = parseFloat(feature.properties["lat"]);
      const lon = parseFloat(feature.properties["lon"]);
      const { fetchVirusDetail } = this.props;
      fetchVirusDetail(pid, lat, lon);
    }
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

  _handleLocaleClose = () => {
    this.setState({ locales: { open: false } });
  };

  _handleLocaleOpen = () => {
    this.setState({ locales: { open: true } });
  };

  _handleChangeLocale = event => {
    const lang = event.target.value;
    sessionStorage.setItem("lang", lang);
    this.props.changeLocale(lang);
  };

  componentDidMount() {
    setTimeout(() => {
      // this._geolocateButtonRef.current._onClickGeolocate();
    }, 1000);
  }

  render() {
    const { classes, locale } = this.props;
    const { viewport, addingMaker, isShowPanel } = this.state;

    return (
      <Grid container direction="column" wrap="nowrap" className={classes.root}>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h5" className={classes.title}>
              <FormattedMessage id="title" />
            </Typography>

            <LanguageIcon />
            <FormControl className={classes.languageFormControl}>
              <Select
                open={this.state.locales.open}
                onClose={this._handleLocaleClose}
                onOpen={this._handleLocaleOpen}
                value={locale.lang}
                onChange={this._handleChangeLocale}
                IconComponent={() => {
                  return <div />;
                }}
                input={
                  <BootstrapInput name="locale" id="locale-customized-select" />
                }
              >
                {supportedLocales.map(locale => {
                  return (
                    <MenuItem key={locale.lang} value={locale.lang}>
                      {locale.desc}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>

            <a
              href="https://github.com/hyperion-hyn/COVID-2019-DATA"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg aria-hidden="true" className={classes.githubIcon}>
                <use xlinkHref="#icongit-copy"></use>
              </svg>
            </a>
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
              <VirusDailyPanel></VirusDailyPanel>
            </Grid>
          </Grid>

          <Grid item xs container className={classes.mapBox} justify="center">
            <MapGL
              {...viewport}
              // mapStyle="https://cn.tile.map3.network/ncov_v1.json"
              mapStyle="https://cn.tile.map3.network/global_covid.json"
              onViewportChange={this._onViewportChange}
              mapOptions={{
                localIdeographFontFamily:
                  "'Noto Sans', 'Noto Sans CJK SC', sans-serif",
                attributionControl: false
              }}
              interactiveLayerIds={["covid_event_poi"]}
              onClick={this._onMapClick}
            >
              <GeolocateControl
                style={this.geolocateStyle}
                ref={this._geolocateButtonRef}
                positionOptions={{ enableHighAccuracy: true }}
                trackUserLocation={false}
                showUserLocation={true}
              />

              {this._renderSelectedPoiPopup()}

              {this._renderAddNewMaker()}
              {this._renderAddNewPopup()}

              <Box className={classes.addVirusBox}>
                <ButtonBase
                  onClick={this._onAddVirus}
                  className={classes.addVirusButton}
                >
                  <Typography variant="h6" className={classes.addVirusTip}>
                    <FormattedMessage id="click_to_add_virus_info" />
                  </Typography>
                </ButtonBase>
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
            onClick={() => {
              this.updateUploadPanelState(true);
            }}
          >
            <Typography color="textSecondary" variant={"body2"}>
            <FormattedMessage id="drag_marker_to_location_of_virus" />
            </Typography>
            <Typography
              color="primary"
              variant="body2"
              className={classes.clickableTip}
            >
              <FormattedMessage id="click_to_edit_virus_info" />
            </Typography>
          </Box>
        </Popup>
      )
    );
  }

  _renderSelectedPoiPopup = () => {
    const {
      childInitData
    } = this.state
    const {
      classes,
      selectedVirus,
      cancelVirusDetail,
      clearVirusDetail
    } = this.props;
    if (selectedVirus.status == Status.LOADING) {
      return (
        <Popup
          longitude={selectedVirus.data.lon}
          latitude={selectedVirus.data.lat}
          onClose={() => cancelVirusDetail()}
          closeOnClick={false}
          offsetTop={-32}
        >
          <CircularProgress
            size={24}
            style={{
              maringLeft: 16,
              maringRight: 16,
              maringTop: 4,
              maringBottom: 4
            }}
          />
        </Popup>
      );
    } else if (selectedVirus.status == Status.FAILED) {
      return (
        <Popup
          longitude={selectedVirus.data.lon}
          latitude={selectedVirus.data.lat}
          onClose={() => cancelVirusDetail()}
          closeOnClick={false}
          offsetTop={-32}
        >
          <Typography color="textSecondary" variant={"body2"}>
            {selectedVirus.msg ? `错误: ${selectedVirus.msg}` : "加载详情失败!"}
          </Typography>
        </Popup>
      );
    } else if (selectedVirus.status == Status.SUCCESS) {
      return (
        <Popup
          longitude={selectedVirus.data.lon}
          latitude={selectedVirus.data.lat}
          onClose={() => clearVirusDetail()}
          closeOnClick={false}
          offsetTop={-32}
        >
          <Typography
            color="textSecondary"
            variant={"body2"}
            style={{ maxWidth: 240 }}
          >
            {this._genDesc(selectedVirus.data)}
          </Typography>

          {selectedVirus.data.source && (
            <Box display="flex" direction="column">
              <Typography color="textSecondary" variant={"body2"}>
                信息来源:
              </Typography>

              <a
                href={selectedVirus.data.source}
                target="_blank"
                rel="noopener noreferrer"
              >
                {selectedVirus.data.source}
              </a>
            </Box>
          )}

          <Box display="flex" justifyContent="flex-end">
            <Typography
              variant={"body2"}
              color="primary"
              className={classes.clickableTip}
              onClick={() => {
                console.log("todo update poi info");
                this.setState({childInitData: selectedVirus.data});
                this.updateUploadPanelState(true)
              }}
            >
              纠错
            </Typography>
          </Box>
        </Popup>
      );
    }
  };

  _genDesc = model => {
    let dest;

    if (model.type == "help") {
      dest = "线索/求助信息";
    } else if (model.type == "cured") {
      dest = "已康复";
    } else if (model.type == "confirm") {
      dest = "已确诊";
    } else if (model.type == "dead") {
      dest = "已死亡";
    }

    dest += `：发生在${model.address}`;

    if (model.ancestral_home) {
      dest += `，来自${model.ancestral_home}`;
    }
    if (model.gender) {
      dest += `，${this._getSex(model.gender)}`;
    }
    if (model.age) {
      dest += `，${model.age}岁`;
    }
    if (model.symptom) {
      dest += `，有${model.symptom}症状`;
    }
    if (model.travel_history) {
      dest += `，到往过${model.travel_history}`;
    }
    if (model.remark) {
      dest += `，${model.remark}`;
    }
    if (model.contact) {
      dest += `，联系方式: ${model.contact}`;
    }
    return dest;
  };

  _getSex(gender) {
    if (gender == "female") {
      return "女性";
    } else if (gender == "male") {
      return "男性";
    } else {
      return "";
    }
  }

  _uploadPanelView(isShowPanel) {
    const { classes } = this.props;
    const { addingMaker,childInitData } = this.state;

    let latitude,longitude;
    if(addingMaker){
      latitude = addingMaker.latitude;
      longitude = addingMaker.longitude;
    }else if(childInitData){
      latitude = childInitData.lat;
      longitude = childInitData.lon;
    }
    if (isShowPanel) {
      return (
        // addingMaker && (
          <Box className={classes.uploadVirusPanelBox}>
            <Grid className={classes.uploadVirusPanelGrid}>
              <UploadVirusPanel
                childInitData={childInitData}
                childLatitude={latitude}
                childLongitude={longitude}
                callbackParent={isMakerShow => {
                  if (!isMakerShow) {
                    this.setState({ addingMaker: undefined });
                  }
                  this.setState({childInitData:undefined});
                  this.updateUploadPanelState(false);
                }}
              ></UploadVirusPanel>
            </Grid>
          </Box>
        // )
      );
    }
  }

  updateUploadPanelState(isShowPanel) {
    this.setState({ isShowPanel: isShowPanel });
  }
}

const mapStateToProps = (state, onwProps) => ({
  locale: state.locale,
  currentLocale: state.intl.locale,
  selectedVirus: state.virusDetailReducer
});

const mapDispatchToProps = {
  changeLocale: LangaugeActions.changeLocale,
  fetchVirusDetail: VirusStatusActions.fetchVirusModel,
  clearVirusDetail: VirusStatusActions.cleartVirusModel,
  cancelVirusDetail: VirusStatusActions.cancelLoadVirusModel
};

//see https://react-redux.js.org/api/connect
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Main));
// mapStateToProps,
// mapDispatchToProps
