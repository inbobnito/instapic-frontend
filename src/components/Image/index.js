import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles(theme => ({

}));

export default function Image({match}) {

    const classes = useStyles();
    return (
        <section>
            <img src={props.img} alt={props.title} />
            <Typography>
                Viewing image <span className={classes.uname}>{match.params.id}</span>

                Submitted by <span>Person</span>
                Uploaded on <span>Date</span>
                Description: <span>Some stuff about this picture.</span>
            </Typography>
        </section>
    )
}