import React, { Component } from "react";
import { Grid, Box, Typography, TextField } from "@material-ui/core";
import { connect } from "react-redux";
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
    Checkbox
} from "@material-ui/core";

const styles = theme => ({
    root: {
        backgroundColor: "#ffffff"
    },
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
        marginLeft:3
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
        margin: 3,
        width: "100%",
    },
    submitButtonFont: {
        fontSize: "14px",
        color: "#333333"
    },
})

class UploadVirusPanel extends Component {

    inputGridItemStar(hasStar){
        const { classes } = this.props;
        if(hasStar){
            return (<Typography className={classes.starFont}>*</Typography>)
        }
    }

    inputGridItem(titleText, placeholderText, hasStar) {
        const { classes } = this.props;
        return (
            <Grid direction="row" container alignItems="center" className={classes.gridRow}>
                <Grid item className={classes.gridTitle} direction="row" container>
                    <Typography className={classes.titleFont}>{titleText}</Typography>
                    {this.inputGridItemStar(hasStar)}
                </Grid>
                <TextField
                    InputProps={{
                        classes: {
                            input: classes.propsInputField
                        }
                    }}
                    className={classes.classInputField}
                    placeholder={placeholderText} />
            </Grid>
        )
    }

    render() {
        const { classes } = this.props;
        // 数据传递
        // var abc = this.props.abc;
        // this.props.callbackParent("child console");
        // console.log("aaaaaaaa===== " + abc)
        return (
            <Grid direction="column" container>
                <Grid direction="row" container className={classes.gridRow}>
                    <Grid item xs><Typography className={classes.topTitleFont}>更新/上报疫情信息</Typography></Grid>
                    <Grid item><Typography variant="subtitle2">叉叉</Typography></Grid>
                </Grid>
                <Grid direction="row" container alignItems="center" className={classes.gridRow}>
                    <Grid direction="row" container className={classes.gridTitle}>
                        <Typography className={classes.titleFont}>信息类型</Typography>
                        <Typography className={classes.starFont}>*</Typography>
                    </Grid>
                    {/* <Select value={age} onChange={handleChange} displayEmpty className={classes.selectEmpty}> */}
                    <Grid className={classes.gridContent}>
                        <FormControl>
                            <Select value={1}>
                                <MenuItem value={1}>
                                    <Typography className={classes.propsInputField}>疑似感染/求助</Typography>
                                </MenuItem>
                                <MenuItem value={10}>
                                    <Typography className={classes.propsInputField}>Ten</Typography>
                                </MenuItem>
                                <MenuItem value={20}>
                                    <Typography className={classes.propsInputField}>Twenty</Typography>
                                </MenuItem>
                                <MenuItem value={30}>
                                    <Typography className={classes.propsInputField}>Thirty</Typography>
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                {this.inputGridItem("信息来源", "请输入该信息的权威出处")}
                {this.inputGridItem("详细地址", "", true)}
                {this.inputGridItem("联系方式", "请输入联系方式")}
                {this.inputGridItem("籍贯", "中国广州")}
                <Grid direction="row" container alignItems="center" className={classes.gridRow}>
                    <Grid item className={classes.gridTitle}>
                        <Typography className={classes.titleFont}>年龄</Typography>
                    </Grid>
                    <TextField
                        InputProps={{
                            classes: {
                                input: classes.propsInputField
                            }
                        }}
                        className={classes.ageClassInputField} />
                    <Typography className={classes.titleFont}>岁</Typography>
                </Grid>
                {this.inputGridItem("病情症状", "乏力，发烧38度")}
                {this.inputGridItem("最近1月到访过的地方", "中国河北，韩国")}
                {this.inputGridItem("其他补充", "其他信息补充")}
                <Grid direction="column" container alignItems="center" >
                    <Grid item xs>
                        <Button className={classes.submitButton}>
                            <Typography className={classes.submitButtonFont}>提交</Typography>
                        </Button>
                    </Grid>
                </Grid>
                <Grid direction="column" container alignItems="center" >
                    <FormControlLabel
                        value="end"
                        control={<Checkbox color="primary" />}
                        label={<Typography className={classes.titleFont}>我虔诚的保证提交的数据是真实的。</Typography>}
                        labelPlacement="end"
                    />
                </Grid>
            </Grid>
        );
    }
}

export default connect(
)(withStyles(styles)(UploadVirusPanel));