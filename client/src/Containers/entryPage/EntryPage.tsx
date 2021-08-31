import React, { useEffect } from 'react'
import { FormControl, InputLabel, Input, FormHelperText, Box, Button, Grid, makeStyles } from '@material-ui/core';
import Layout from '../../components/Layout/Layout'
import { useForm, SubmitHandler } from "react-hook-form";
import Icon from '@material-ui/core/Icon';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import axios from 'axios'
import { NavLink, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, loginUser } from '../../redux/actions/actions';
import { AppState } from '../../redux/reducers/rootReducer';

type Inputs = {
    email: string,
    password: string,
};

const useStyles = makeStyles((theme) => ({
    EntryPage: {
        height: "60vh"
    },
    buttons: {
        marginTop: "10px",
        marginRight: '5px'
    },
    inputs : {
        padding:"5px",
        marginTop:"5px"
    }
}));

const EntryPage: React.FC = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector((state: AppState) => state.mainReducer.user)
    const message = useSelector((state: AppState) => state.mainReducer.message)
    const { register, getValues, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
    const classes = useStyles();

    const onSubmit: SubmitHandler<Inputs> = data => {
        const { email, password } = data

    };

    const redirectGoogleAuth = async () => {
        const { data } = await axios.get('http://localhost:5000/api/auth/google/url');
        window.location.assign(data)
    }

    const loginHandler = () => {
        const email = getValues('email')
        const password = getValues('password')

        dispatch(loginUser({ email, password }))
    }

    useEffect(() => {
        // function getCookie(name : string) {
        //     const value = `; ${document.cookie}`;
        //     const parts:any = value.split(`; ${name}=`);
        //     if (parts.length === 2) return parts.pop().split(';').shift();
        //   }

        // console.log(getCookie('auth_token'))
        const token = localStorage.getItem('token')
        if(token){
            history.push('/actionPage')
        }
    }, [localStorage.getItem('token')])

    return (
        <Grid container justifyContent="center" alignItems="center" className={classes.EntryPage}>
            <Box>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box component="div">
                        <Input className={classes.inputs} placeholder="login" {...register("email")} inputProps={{ 'aria-label': 'description' }} />
                    </Box>
                    <Box component="div">
                        <Input className={classes.inputs} placeholder="password" {...register("password")} id="my-input" inputProps={{ 'aria-label': 'description' }} />
                    </Box>
                    <h1>{message}</h1>
                    <Button
                        className={classes.buttons}
                        variant="contained"
                        color="primary"
                        endIcon={<CloudUploadIcon />}
                        type="submit"
                        onClick={loginHandler}
                    >
                        login
                    </Button>
                    <Button
                        className={classes.buttons}
                        variant="contained"
                        color="primary"
                        type="submit"
                    >
                        register
                    </Button>
                    <Grid component="div" className={classes.buttons}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={redirectGoogleAuth}
                        >
                            Sign up
                        </Button>
                    </Grid>
                </form>
            </Box>
        </Grid>
    )
}

export default EntryPage
