import { Card, Divider } from '@mui/material';
import React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyle = makeStyles({
    container: {
        border: 'solid 1px #e4e8ec',
        borderRadius: '8px',
        marginTop: '8px',
        padding: '18px 18px 10px',
        fontSize: '15px',
        lineHeight: '16px',
        overflow: 'hidden',
        color: '#424D57',
    },
    caption: {
        fontSize: '18px',
        fontWeight: '600',
        lineHeight: '16px',
        marginBottom: '14px',
        textAlign: 'left',
    },

    detailRow: {
        marginBottom: '8px',
        display: 'flex',
        flexDirection: 'row',
        lineHeight: '20px',
    },
    detailCaption: {
        color: '#677179',
        marginRight: '3px',
    },
    clickLabel: {
        color: '#4284f5',
        cursor: 'pointer',
        marginLeft: '5px',
    },
    linkUrl: {
        display: 'flex',
        flexDirection: 'row',
    }

})

const InfoCard = () => {
    const classes = useStyle();
    return(
        <div>
            <Card className={classes.container}>
                <div className={classes.caption}>Ticket Info</div>
                <div className={classes.detailRow}>
                    <div className={classes.detailCaption}>Ticket ID:</div>
                    <div className={classes.linkUrl}>K5XH9<div className={classes.clickLabel}>Copy URL</div></div>
                </div>
                <div className={classes.detailRow}>
                    <div className={classes.detailCaption}>Created:</div>
                    <div>8 Dec 2022</div>
                </div>
                <div className={classes.detailRow}>
                    <div className={classes.detailCaption}>Last Message:</div>
                    <div>8 Dec 2022</div>
                </div>
                <div className={classes.detailRow}>
                    <div className={classes.detailCaption}>Status:</div>
                    <div>Pending</div>
                </div>
                <div className={classes.detailRow}>
                    <div className={classes.detailCaption}>Source:</div>
                    <div>Created Manually</div>
                </div>
                <Divider sx={{marginY: '12px'}}/>
                <div className={classes.detailRow}>
                    <div className={classes.detailCaption}>Tags:</div>
                </div>
                <div className={classes.detailRow}>
                    <div className={classes.clickLabel}>+ Add Tag</div>
                </div>
            </Card>
        </div>
    )
}

export default InfoCard;