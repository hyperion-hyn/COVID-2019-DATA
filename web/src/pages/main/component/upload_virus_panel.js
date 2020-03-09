import React, { Component } from "react";
import { Grid, Box, Typography, TextField } from "@material-ui/core";
import { TextField as FinalTextField, Radio, Select } from 'final-form-material-ui';
import { Form, Field } from 'react-final-form';
import { VirusStatusActions } from "../../../actions/virus_status";
import { connect } from "react-redux";
import { Close } from '@material-ui/icons';
import { PoiInfoModel } from "../../../data/model"
import Status from "../../../config/status";
import {
    withStyles,
    MenuItem,
    FormControl,
    Button,
    FormControlLabel,
    Checkbox,
    IconButton,
    RadioGroup,
    Dialog,
    DialogTitle,
    DialogActions,
    Paper,
    CircularProgress
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
        paddingRight:10,
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
    reportGrid: {
        marginTop: 10
    },
    reportTitleFont: {
        fontSize: "11px",
        color: "#1E90FF"
    },
})

class UploadVirusPanel extends Component {
    constructor(props) {
        super(props);
        const { childInitData, childLatitude, childLongitude } = this.props;

        let submitEntity;
        if (childInitData === undefined) {
            submitEntity = { type: "help", lat: childLatitude, lon: childLongitude }
            this.state = {
                submitEntity: submitEntity,
                isShowCheckDialog: false,
                isMakeSure: false,
                isShowDetermineDialog: false,
                isShowReportDialog: false,
                isUpdatePoi: false
            }
        } else {
            submitEntity = childInitData;
            this.state = {
                submitEntity: submitEntity,
                isShowCheckDialog: false,
                isMakeSure: false,
                isShowDetermineDialog: false,
                isShowReportDialog: false,
                isUpdatePoi: true
            }
        }
        console.log("update entity submitEntity = " + JSON.stringify(submitEntity))
    }

    inputGridItemStar(hasStar) {
        const { classes } = this.props;
        if (hasStar) {
            return (<Typography className={classes.starFont}>*</Typography>)
        }
    }

    inputGridItem(titleText, placeholderText, hasStar, inputType) {
        const { classes, intl } = this.props;

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

        let initValue = "";

        return (
            <Grid direction="row" container alignItems="center" className={classes.gridRow}>
                <Grid item className={classes.gridTitle} direction="row" container>
                    <Typography className={classes.titleFont}>{intlTitle}</Typography>
                    {this.inputGridItemStar(hasStar)}
                </Grid>
                <Field
                    name={inputType}
                    component={FinalTextField}
                    type="text"
                    InputProps={{
                        classes: {
                            input: classes.propsInputField
                        }
                    }}
                    className={classes.classInputField}
                    placeholder={intlPlace} />
            </Grid>
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
                <DialogTitle id="alert-dialog-slide-title"><FormattedMessage id="confirm_info_true" /></DialogTitle>
                <DialogActions>
                    <Button onClick={() => {
                        this.setState({ isShowCheckDialog: false })
                    }} color="primary"><FormattedMessage id="ok" /></Button>
                </DialogActions>
            </Dialog>
        )
    }

    determineSubmitDialog() {
        const { updatePoiDataApi, uploadPoiDataApi, uploadPoiResult } = this.props;
        // 数据传递
        const { submitEntity, isUpdatePoi, isShowDetermineDialog, isMakeSure } = this.state;
        console.log("ready submit !!!!! ==== isUpdatePoi== " + isUpdatePoi + " data == "
            + JSON.stringify(submitEntity) + " isMakeSure " + isMakeSure)

        let isLoading = false;
        if (uploadPoiResult.status === Status.LOADING) {
            isLoading = true;
        }

        return (
            <Dialog
                open={isShowDetermineDialog}
                keepMounted
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title"><FormattedMessage id="is_confirmed_virus_info" />
                </DialogTitle>
                <DialogActions>
                    {isLoading && (<CircularProgress
                        size={24}
                        style={{
                            maringLeft: 16,
                            maringRight: 16,
                            maringTop: 4,
                            maringBottom: 4
                        }}
                    />)}
                    <Button
                        disabled={isLoading}
                        onClick={() => {
                            if (isUpdatePoi) {
                                updatePoiDataApi(submitEntity)
                            } else {
                                uploadPoiDataApi(submitEntity)
                            }
                        }} color="primary"><FormattedMessage id="ok" />
                    </Button>
                    <Button
                        disabled={isLoading}
                        onClick={() => {
                            this.setState({ isShowDetermineDialog: false })
                        }} color="primary"><FormattedMessage id="cancel" />
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }

    determineReportDialog() {
        const { reportPoiDataApi, childInitData, uploadPoiResult } = this.props;
        const { isShowReportDialog } = this.state;

        let isLoading = false;
        if (uploadPoiResult.status === Status.LOADING) {
            isLoading = true;
        }

        return (
            <Dialog
                open={isShowReportDialog}
                keepMounted
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title"><FormattedMessage id="is_confirmed_virus_info" /></DialogTitle>
                <DialogActions>
                    {isLoading && (<CircularProgress
                        size={24}
                        style={{
                            maringLeft: 16,
                            maringRight: 16,
                            maringTop: 4,
                            maringBottom: 4
                        }}
                    />)}
                    <Button
                        disabled={isLoading}
                        onClick={() => {
                            reportPoiDataApi(childInitData);
                            this.setState({ isShowReportDialog: false });
                        }} color="primary"><FormattedMessage id="ok" /></Button>
                    <Button
                        disabled={isLoading}
                        onClick={() => {
                            this.setState({ isShowReportDialog: false })
                        }} color="primary"><FormattedMessage id="cancel" /></Button>
                </DialogActions>
            </Dialog>
        )
    }

    reportPoiInfo() {
        const { classes } = this.props;
        const { isUpdatePoi } = this.state;

        if (isUpdatePoi) {
            return (
                <Grid direction="column" container alignItems="center" className={classes.reportGrid} >
                    <Button
                        onClick={(event) => {
                            this.setState({ isShowReportDialog: true });
                        }}>
                        <Typography className={classes.reportTitleFont}><FormattedMessage id="report_the_news" /></Typography>
                    </Button>
                </Grid>
            )
        }
    }

    componentDidUpdate() {
        const { callbackParent, uploadPoiResult, intl } = this.props;
        const { isUpdatePoi } = this.state;

        if (uploadPoiResult.status !== Status.IDLE
            && uploadPoiResult.status !== Status.LOADING
            && uploadPoiResult.status !== Status.CANCELED) {

            let uploadResultText = "";
            let severity = "";
            if (uploadPoiResult.status === Status.SUCCESS) {
                severity = "success";
                if (uploadPoiResult.msg === VirusStatusActions.UPLOAD_POI_DATA) {
                    uploadResultText = intl.formatMessage({ id: 'upload_virus_info_success', });
                } else if (uploadPoiResult.msg === VirusStatusActions.UPDATE_POI_DATA) {
                    uploadResultText = intl.formatMessage({ id: 'update_virus_info_success', });
                } else if (uploadPoiResult.msg === VirusStatusActions.REPORT_POI_DATA) {
                    uploadResultText = intl.formatMessage({ id: 'report_virus_info_success', });
                }
            } else if (uploadPoiResult.status === Status.FAILED) {
                severity = "error";
                if (uploadPoiResult.msg === undefined
                    || uploadPoiResult.msg === "") {
                    uploadResultText = intl.formatMessage({ id: 'upload_virus_info_fail_network', });
                } else {
                    uploadResultText = uploadPoiResult.msg
                }
            }

            let snackbarEntity = { severity: severity, uploadResultText: uploadResultText }
            callbackParent(isUpdatePoi, snackbarEntity);
        }
    }

    componentWillUnmount() {
        const { cancelledUploadedPoiDataApi } = this.props;
        cancelledUploadedPoiDataApi();
    }

    onSubmit = values => {
        // const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
        // await sleep(300);
        // window.alert(JSON.stringify(values, 0, 2));

        const { isMakeSure } = this.state;

        if (!isMakeSure) {
            this.setState({ isShowCheckDialog: true })
        } else {
            this.setState({ submitEntity: values, isShowDetermineDialog: true })
        }
    };

    validate = values => {
        const { intl } = this.props;
        const errors = {};
        if (!values.address) {
            errors.address = intl.formatMessage({id:'must_input'});
        }
        return errors;
    };

    render() {
        const { isUpdatePoi, submitEntity } = this.state;
        const { classes, callbackParent } = this.props;
        let topTitleText = "";
        if (isUpdatePoi) {
            topTitleText = "update_virus_info";
        } else {
            topTitleText = "submit_virus_info";
        }

        return (
            <Form
                onSubmit={this.onSubmit}
                initialValues={submitEntity}
                validate={this.validate}
                render={({ handleSubmit, reset, submitting, pristine, values }) => (
                    <form onSubmit={handleSubmit} noValidate>
                        <Paper variant="outlined">
                            <Grid direction="column" container>
                                <Grid direction="row" container alignItems="center">
                                    <Grid item xs ><Typography className={classes.topTitleFont}><FormattedMessage id={topTitleText} /></Typography></Grid>
                                    <IconButton onClick={() => callbackParent(true, undefined)}>
                                        <Close ></Close>
                                    </IconButton>
                                </Grid>
                                <Grid direction="row" container alignItems="center" className={classes.gridRow}>
                                    <Grid direction="row" container className={classes.gridTitle} style={{ paddingTop: 15 }}>
                                        <Typography className={classes.titleFont}><FormattedMessage id="info_type" /></Typography>
                                        <Typography className={classes.starFont}>*</Typography>
                                    </Grid>
                                    <Grid className={classes.gridContent}>
                                        <FormControl>
                                            <Field
                                                name="type"
                                                component={Select}
                                            >
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
                                            </Field>
                                        </FormControl>
                                    </Grid>
                                </Grid>

                                {this.inputGridItem("info_sources", "enter_author_source_for_info", false, "source")}
                                {this.inputGridItem("address", "", true, "address")}
                                {this.inputGridItem("contact", "enter_contact", false, "contact")}
                                {this.inputGridItem("hometown", "guangdong_china", false, "ancestral_home")}
                                <Grid direction="row" container alignItems="center" className={classes.gridRow}>
                                    <Grid item className={classes.gridTitle}>
                                        <Typography className={classes.titleFont}><FormattedMessage id="age" />
                                        </Typography>
                                    </Grid>
                                    <Field
                                        name="age"
                                        component={FinalTextField}
                                        type="text"
                                        InputProps={{
                                            classes: {
                                                input: classes.propsInputField
                                            }
                                        }}
                                        className={classes.ageClassInputField} />
                                    <Typography className={classes.titleFont}><FormattedMessage id="year_old" />
                                    </Typography>
                                </Grid>
                                <Grid direction="row" container alignItems="center" className={classes.gridRow}>
                                    <Grid item className={classes.gridTitle}>
                                        <Typography className={classes.titleFont}><FormattedMessage id="gender" />
                                        </Typography>
                                    </Grid>
                                    <FormControl component="fieldset">
                                        <RadioGroup row>
                                            <FormControlLabel control={
                                                <Field
                                                    name="gender"
                                                    component={Radio}
                                                    type="radio"
                                                    value="male"
                                                    size="small"
                                                    color="primary" />
                                            }
                                                label={<Typography className={classes.titleFont}><FormattedMessage id="male" />
                                                </Typography>} />
                                            <FormControlLabel control={
                                                <Field
                                                    name="gender"
                                                    component={Radio}
                                                    type="radio"
                                                    value="female"
                                                    size="small"
                                                    color="primary" />
                                            }
                                                label={<Typography className={classes.titleFont}><FormattedMessage id="female" />
                                                </Typography>} />
                                            <FormControlLabel control={
                                                <Field
                                                    name="gender"
                                                    component={Radio}
                                                    type="radio"
                                                    value="unknow"
                                                    size="small"
                                                    color="primary" />
                                            }
                                                label={<Typography className={classes.titleFont}><FormattedMessage id="unkonwn" />
                                                </Typography>} />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                {this.inputGridItem("condition_symptoms", "weakness_fever_38_degrees", false, "symptom")}
                                {this.inputGridItem("places_visited_in_january", "hebei_china_south_korea", false, "travel_history")}
                                {this.inputGridItem("other_supplements", "additional_information", false, "remark")}
                                <Grid direction="column" container alignItems="center" >
                                    <Grid item xs>
                                        <Button variant="outlined" type="submit" className={classes.submitButton} disabled={submitting}>
                                            <Typography className={classes.submitButtonFont}><FormattedMessage id="submit" />
                                            </Typography>
                                        </Button>
                                    </Grid>
                                </Grid>
                                {this.reportPoiInfo()}
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
                            {this.checkUploadData()}
                            {this.determineSubmitDialog()}
                            {this.determineReportDialog()}
                        </Paper>
                    </form>)} />
        );
    }
}

const mapStateToProps = (state, onwProps) => ({
    uploadPoiResult: state.uploadPoiReducer,
});

const mapDispatchToProps = {
    updatePoiDataApi: VirusStatusActions.updatePoiData,
    uploadPoiDataApi: VirusStatusActions.uploadPoiData,
    reportPoiDataApi: VirusStatusActions.reportPoiData,
    cancelledUploadedPoiDataApi: VirusStatusActions.cancelledUploadedPoiData,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(injectIntl(UploadVirusPanel)));