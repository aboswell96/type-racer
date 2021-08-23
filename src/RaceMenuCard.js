import React, { useState } from 'react';
import './RaceMenuCard.css'
import { Card,CardMedia, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import img from "./res/img/keyboard_cartoon2.jpg";


const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 115,
    },
  });

const RaceMenuCard = (props) => {
    console.log('window inner height: ', window.innerHeight);
    const classes = useStyles();

    return (

        <Card class="racemenu__card" onClick={()=>props.onClick()}>
            <CardMedia
                className={classes.media}
                image={img}
                title={props.alt_text}
            />
            <CardContent>
                <Typography align="center" gutterBottom variant="h5" component="h2">
                    {props.text}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default RaceMenuCard;