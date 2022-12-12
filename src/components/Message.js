import React from "react";
import { Divider } from "@mui/material";
import { makeStyles } from "@material-ui/styles";
const useStyle = makeStyles({
  messageConainer: {
    display: "flex",
    flexDirection: "column",
  },
  messageheader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: "8px",
    fontSize: "14px",
    lineHeight: "1.43",
  },
  messageName: {
    display: 'flex',
    flex: '1 1 0%',
    fontWeight: '900',
    color: 'rgba(66, 77, 87, 0.6)',
  },
  sendDate: {
    color: 'rgba(66, 77, 87, 0.6)',
  },
  messageBody: {
    background: 'rgb(0, 122, 255)',
    borderRadius: '8px',
    fontSize: '15px',
    lineHeight: '2',
    padding: '12px',
    overflow: 'auto',
    overflowWrap: 'break-word',
    textAlign: 'left',
    color: 'white',
    },



});

const Message = ({ type, senderName, dateTime, ticketMessage, message, attachments }) => {
    const classes = useStyle();
  return (
    <div className={classes.messageConainer}>
      <div className={classes.messageheader}>
        <div>{senderName}</div>
        <div className={classes.sendDate}>Thu,8 Dec 2022, 10:57 am</div>
      </div>
      <div className={classes.messageBody}>
        <div>This is Message Body</div>
        {
            attachments && attachments.length > 0 ?
            <div>
                <Divider sx={{marginY: '20px'}} light={true}/>
                <div>
                    Attachments:
                    <ul>
                        {
                            attachments.map((item) => <li style={{marginLeft: '20px'}}><a href="#" style={{borderBottom: '1px white solid'}}>{item}</a></li>)
                        }
                    </ul>
                </div>
            </div>
            : null
        }
      </div>
    </div>
  );
};

export default Message;
