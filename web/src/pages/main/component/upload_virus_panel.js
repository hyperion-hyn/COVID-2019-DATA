import React, { Component } from "react";
import { Grid, Box, Typography, TextField } from "@material-ui/core";
import { VirusStatusActions } from "../../../actions/virus_status";
import { connect } from "react-redux";
import { Close } from '@material-ui/icons';
import { PoiInfoModel } from "../../../data/model"
import {
    withStyles,
    TableRow,
    TableBody,
    TableCell,
    Table,
    MenuItem,
    Select,
    FormControl,
    Button,
    FormControlLabel,
    Checkbox,
    IconButton,
    RadioGroup,
    Radio,
    Dialog,
    DialogTitle,
    DialogActions,
    Paper
} from "@material-ui/core";
import { injectIntl, FormattedMessage } from "react-intl";

const styles = theme => ({
    topTitleFont: {
        marginLeft: 16,
        marginTop: 10,
        fontSize: "14px",
        color: "#333333"
    },
    gridRow: {
        margin: 3
    },
    gridTitle: {
        paddingLeft: 20,
        width: "30%",
        alignItems: "right",
    },
    gridContent: {
        width: "70%",
    },
    titleFont: {
        fontSize: "11px",
        color: "#333333"
    },
    starFont: {
        fontSize: "11px",
        color: "#FF0000",
        marginLeft: 3
    },
    contentFont: {
        fontSize: "9px",
        color: "#333333"
    },
    propsInputField: {
        fontSize: "11px",
    },
    classInputField: {
        width: "60%"
    },
    ageClassInputField: {
        width: "20%"
    },
    submitButton: {
        marginTop: 7,
        width: "100%",
    },
    submitButtonFont: {
        fontSize: "14px",
        color: "#333333"
    },
})

class UploadVirusPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: "help",
            source: "",
            address: "",
            contact: "",
            ancestralHome: "",
            age: "",
            gender: "",
            symptom: "",
            travelHistory: "",
            remark: "",
            isShowCheckDialog: false,
            isMakeSure: false,
            isShowDetermineDialog:false,
        }
    }

    inputGridItemStar(hasStar) {
        const { classes } = this.props;
        if (hasStar) {
            return (<Typography className={classes.starFont}>*</Typography>)
        }
    }

    inputGridItem( titleText, placeholderText, hasStar, inputType) {
        const { intl, classes } = this.props;

        var intlTitle = intl.formatMessage({
            id: titleText, 
          });
        
        var intlPlace;
        if (hasStar) {
            intlPlace = "";
        } else {
            intlPlace = intl.formatMessage({
                id: placeholderText, 
            });
        }
        

        return (
            <Grid direction="row" container alignItems="center" className={classes.gridRow}>
                <Grid item className={classes.gridTitle} direction="row" container>
                    <Typography className={classes.titleFont}>{intlTitle}</Typography>
                    {this.inputGridItemStar(hasStar)}
                </Grid>
                <TextField
                    InputProps={{
                        classes: {
                            input: classes.propsInputField
                        }
                    }}
                    onChange={(event) => {
                        let value = event.target.value;
                        switch (inputType) {
                            case "source": this.setState({ source: value });
                                break;
                            case "address": this.setState({ address: value });
                                break;
                            case "contact": this.setState({ contact: value });
                                break;
                            case "ancestralHome": this.setState({ ancestralHome: value });
                                break;
                            case "age": this.setState({ age: value });
                                break;
                            case "symptom": this.setState({ symptom: value });
                                break;
                            case "travelHistory": this.setState({ travelHistory: value });
                                break;
                            case "remark": this.setState({ remark: value });
                                break;
                        }
                    }}
                    className={classes.classInputField}
                    placeholder={intlPlace} />
            </Grid>
        )
    }

    uploadResultDialog() {
        const { uploadPoiResult, callbackParent, cancelledUploadedPoiDataApi } = this.props;
        let isOpen = false;
        let uploadResultText = "";
        let result = false;
        if (uploadPoiResult.msg === "success") {
            result = true;
            isOpen = true;
            uploadResultText = "疫情信息提交成功"
        }else if(uploadPoiResult.msg === "fail"){
            result = false;
            isOpen = true;
            uploadResultText = "网络异常，疫情信息提交失败！"
        }
        return (
            <Dialog
                open={isOpen}
                keepMounted
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{uploadResultText}</DialogTitle>
                <DialogActions>
                    <Button onClick={() => {
                        cancelledUploadedPoiDataApi();
                        if(result){
                            callbackParent(false);
                        }
                    }} color="primary"><FormattedMessage id="ok" /></Button>
                </DialogActions>
            </Dialog>
        )
    }

    checkUploadData() {
        const { isShowCheckDialog } = this.state;
        return (
            <Dialog
                open={isShowCheckDialog}
                keepMounted
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title"><FormattedMessage id="complete_info" /></DialogTitle>
                <DialogActions>
                    <Button onClick={() => {
                        this.setState({ isShowCheckDialog: false })
                    }} color="primary"><FormattedMessage id="ok" /></Button>
                </DialogActions>
            </Dialog>
        )
    }

    determineSubmitDialog(){
        const { uploadPoiDataApi, childLatitude, childLongitude } = this.props;
        // 数据传递
        const { isShowDetermineDialog, type, source, address, contact, ancestralHome, age, gender, symptom, travelHistory, remark, isMakeSure } = this.state;
        console.log("submit !!!!! ==== " + childLatitude + childLongitude + type + source + address + contact + ancestralHome + age + gender + symptom + travelHistory + remark + " isMakeSure " + isMakeSure)
        
        return (
            <Dialog
                open={isShowDetermineDialog}
                keepMounted
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">是否确认上报疫情信息</DialogTitle>
                <DialogActions>
                    <Button onClick={() => {
                        let uploadModel = new PoiInfoModel();
                        uploadModel.lat = childLatitude;
                        uploadModel.lon = childLongitude;
                        uploadModel.type = type;
                        uploadModel.source = source;
                        uploadModel.address = address;
                        uploadModel.contact = contact;
                        uploadModel.ancestralHome = ancestralHome;
                        uploadModel.age = age;
                        uploadModel.gender = gender;
                        uploadModel.symptom = symptom;
                        uploadModel.travel_history = travelHistory;
                        uploadModel.remark = remark;
                        uploadPoiDataApi(uploadModel)

                        this.setState({ isShowDetermineDialog: false })
                    }} color="primary">确定</Button>
                    <Button onClick={() => {
                        this.setState({ isShowDetermineDialog: false })
                    }} color="primary">取消</Button>
                </DialogActions>
            </Dialog>
        )
    }

    uploadPoiInfo = () => {
        const { isShowDetermineDialog, isShowCheckDialog, isMakeSure, address } = this.state;
        
        if (address === "" || !isMakeSure) {
            this.setState({ isShowCheckDialog: true })
        } else {
            this.setState({ isShowDetermineDialog: true })
        }
    }

    render() {
        const { intl, classes, callbackParent } = this.props;
        return (
            <Paper variant="outlined">
                <Grid direction="column" container>
                    <Grid direction="row" container alignItems="center">
                        <Grid item xs ><Typography className={classes.topTitleFont}><FormattedMessage id="submit_virus_info" /></Typography></Grid>
                        <IconButton onClick={() => callbackParent(true)}>
                            <Close ></Close>
                        </IconButton>
                    </Grid>
                    <Grid direction="row" container alignItems="center" className={classes.gridRow}>
                        <Grid direction="row" container className={classes.gridTitle}>
                            <Typography className={classes.titleFont}><FormattedMessage id="info_type" />
</Typography>
                            <Typography className={classes.starFont}>*</Typography>
                        </Grid>
                        {/* <Select value={age} onChange={handleChange} displayEmpty className={classes.selectEmpty}> */}
                        <Grid className={classes.gridContent}>
                            <FormControl>
                                <Select value={this.state.type}
                                    onChange={(event) => {
                                        this.setState({ type: event.target.value });
                                    }}>
                                    <MenuItem value={"help"}>
                                        <Typography className={classes.propsInputField}><FormattedMessage id="infection_help" />
</Typography>
                                    </MenuItem>
                                    <MenuItem value={"confirm"}>
                                        <Typography className={classes.propsInputField}><FormattedMessage id="confirmed_infection" />
</Typography>
                                    </MenuItem>
                                    <MenuItem value={"cured"}>
                                        <Typography className={classes.propsInputField}><FormattedMessage id="healing" />
</Typography>
                                    </MenuItem>
                                    <MenuItem value={"dead"}>
                                        <Typography className={classes.propsInputField}><FormattedMessage id="death_from_infection" />
</Typography>
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    {this.inputGridItem("info_sources", "enter_author_source_for_info", false, "source")}
                    {this.inputGridItem("address", "", true, "address")}
                    {this.inputGridItem("contact", "enter_contact", false, "contact")}
                    {this.inputGridItem("hometown", "guangdong_china", false, "ancestralHome")}
                    <Grid direction="row" container alignItems="center" className={classes.gridRow}>
                        <Grid item className={classes.gridTitle}>
                            <Typography className={classes.titleFont}><FormattedMessage id="age" />
</Typography>
                        </Grid>
                        <TextField
                            InputProps={{
                                classes: {
                                    input: classes.propsInputField
                                }
                            }}
                            className={classes.ageClassInputField}
                            onChange={(event) => {
                                this.setState({ age: event.target.value });
                            }} />
                        <Typography className={classes.titleFont}><FormattedMessage id="year_old" />
</Typography>
                    </Grid>
                    <Grid direction="row" container alignItems="center" className={classes.gridRow}>
                        <Grid item className={classes.gridTitle}>
                            <Typography className={classes.titleFont}><FormattedMessage id="gender" />
</Typography>
                        </Grid>
                        <RadioGroup aria-label="gender" name="gender1" row
                            value={this.state.gender}
                            onChange={(event) => {
                                this.setState({ gender: event.target.value });
                            }}>
                            <FormControlLabel value="male" control={<Radio size="small" color="primary"/>}
                                label={<Typography className={classes.titleFont}><FormattedMessage id="male" />
                                </Typography>} />
                            <FormControlLabel value="female" control={<Radio size="small" color="primary"/>}
                                label={<Typography className={classes.titleFont}><FormattedMessage id="female" />
                                </Typography>} />
                            <FormControlLabel value="unknow" control={<Radio size="small" color="primary"/>}
                                label={<Typography className={classes.titleFont}><FormattedMessage id="unkonwn" />
                                </Typography>} />
                        </RadioGroup>
                    </Grid>
                    {this.inputGridItem("condition_symptoms", "weakness_fever_38_degrees", false, "symptom")}
                    {this.inputGridItem("places_visited_in_january", "hebei_china_south_korea", false, "travelHistory")}
                    {this.inputGridItem("other_supplements", "additional_information", false, "remark")}
                    <Grid direction="column" container alignItems="center" >
                        <Grid item xs>
                            {/* <Button className={classes.submitButton} onClick={()=>{
                            this.uploadPoiInfo
                            }}> */}
                            <Button variant="outlined" className={classes.submitButton} onClick={this.uploadPoiInfo}>
                                <Typography className={classes.submitButtonFont}><FormattedMessage id="submit" />
</Typography>
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid direction="column" container alignItems="center" >
                        <FormControlLabel
                            value="end"
                            control={<Checkbox
                                size="small"
                                color="primary"
                                onChange={(event) => {
                                    this.setState({ isMakeSure: event.target.checked })
                                }} />}
                            label={<Typography className={classes.titleFont}><FormattedMessage id="submit_detail_desc" />
                            </Typography>}
                            labelPlacement="end"
                        />
                    </Grid>
                </Grid>
                {this.uploadResultDialog()}
                {this.checkUploadData()}
                {this.determineSubmitDialog()}
            </Paper>
        );
    }
}

const mapStateToProps = (state, onwProps) => ({
    uploadPoiResult: state.uploadPoiReducer,
});

const mapDispatchToProps = {
    uploadPoiDataApi: VirusStatusActions.uploadPoiData,
    cancelledUploadedPoiDataApi: VirusStatusActions.cancelledUploadedPoiData,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(injectIntl(UploadVirusPanel)));