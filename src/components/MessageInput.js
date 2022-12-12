import React from "react";
import { makeStyles } from "@material-ui/styles";
import {
  Button,
  Divider,
  FormControlLabel,
  IconButton,
  MenuItem,
  Select,
  Switch,
} from "@mui/material";
import { AttachFile, EmojiEmotions } from "@mui/icons-material";
import './messageinput.css'

const useStyle = makeStyles({
  container: {
    margin: "10px 20px",
  },
  caption: {
    fontSize: "14px",
    lineHeight: "20px",
    marginBottom: "4px",
  },
  inputbox: {
    border: "1px solid rgb(188, 198, 208)",
    borderRadius: "8px",
    position: "relative",
    transition: "background-color 0.2s ease 0s",
    background: "rgb(255, 255, 255)",
  },
  textAreaBox: {
    background: "transparent",
    border: "0px",
    color: "rgb(66, 77, 87)",
    fontSize: "15px",
    lineHeight: "22px",
    margin: "0px",
    outline: "none",
    padding: "0px",
    // resize: "none",
    width: "100%",
    whiteSpace: "pre-wrap",
  },
  textAreaWrapper: {
    padding: "10px 12px 4px",
  },
  buttonGroupBox: {
    padding: "8px 8px 8px 12px",
  },
  buttonGroupWrapper: {
    display: "flex",
    justifyContent: "space-between",
  },
  leftButtonGroupWrapper: {
    display: "flex",
    alignItems: "center",
    alignSelf: "center",
  },
  rightButtonGroupWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  ticketStatusSpan: {
    marginRight: "8px",
    color: "rgba(66, 77, 87, 0.8)",
  },
  statusChange: {
    fontSize: "14px",
    marginRight: "8px",
  },
});

const MessageInput = (props) => {
  const classes = useStyle();
  return (
    <div className={classes.container}>
      <div className={classes.caption}>Message</div>
      <div className={classes.inputbox}>
        <div className={classes.textAreaWrapper}>
          <textarea
            className={classes.textAreaBox}
            dir="auto"
            placeholder="Type # to use canned responses"
            aria-label="message box textarea"
            translate="no"
          ></textarea>
        </div>
        <div className={classes.buttonGroupBox}>
          <div className={classes.buttonGroupWrapper}>
            <div className={classes.leftButtonGroupWrapper}>
              <FormControlLabel
                control={<Switch defaultChecked size="small" />}
                label="Private"
              />
              <Divider orientation="vertical" flexItem />
              <IconButton aria-label="delete">
                <AttachFile />
              </IconButton>
              <IconButton aria-label="delete">
                <EmojiEmotions />
              </IconButton>
            </div>
            <div className={classes.rightButtonGroupWrapper}>
              <div className={classes.statusChange}>
                <span className={classes.ticketStatusSpan}>Ticket Status</span>
                <Select size="small">
                  <MenuItem value={10}>Open</MenuItem>
                  <MenuItem value={20}>Pending</MenuItem>
                  <MenuItem value={30}>Spam</MenuItem>
                  <MenuItem value={30}>Solved</MenuItem>
                </Select>
              </div>
              <Button size="medium" variant="contained">
                Send
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageInput;
