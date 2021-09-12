import React from 'react'
import { Box, Grid, makeStyles } from '@material-ui/core';
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    ActionPage: {
        height: "60vh",
    },
    actions:{ 
        marginTop:10
    }
}));

function ActionPage() {
    const classes = useStyles();

    return (
        <Grid className={classes.ActionPage} container alignItems="center" direction="column" justifyContent="center">
            <Box className={classes.actions}>
                create room
            </Box>
            <Box className={classes.actions}>
                join to existing room
            </Box>
            <Box className={classes.actions}>
                <NavLink to="/rooms">find room</NavLink>
            </Box>
        </Grid>
    )
}

export default ActionPage
