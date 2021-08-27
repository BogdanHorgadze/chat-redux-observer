import React from 'react'
import { FormControl, InputLabel, Input, FormHelperText, Box, Button } from '@material-ui/core';
import Layout from '../../components/Layout/Layout'
import { useForm, SubmitHandler } from "react-hook-form";
import Icon from '@material-ui/core/Icon';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import classes from './EntryPage.module.scss'
import axios from 'axios'
import { NavLink, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, loginUser } from '../../redux/actions/actions';
import { AppState } from '../../redux/reducers/rootReducer';

type Inputs = {
    email: string,
    password: string,
};

const EntryPage: React.FC = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector((state : AppState) => state.mainReducer.user)
    const { register, getValues, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();

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

        dispatch(loginUser({email,password}))
    }

    return (
        <div className={classes.entryPage}>
            <Layout width={200}>
                <h1>{user}</h1>
                <Box>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Box component="div">
                            <Input placeholder="login" {...register("email")} inputProps={{ 'aria-label': 'description' }} />
                        </Box>
                        <Box component="div">
                            <Input placeholder="password" {...register("password")} id="my-input" inputProps={{ 'aria-label': 'description' }} />
                        </Box>
                        <Button
                            variant="contained"
                            color="primary"
                            endIcon={<CloudUploadIcon />}
                            type="submit"
                            onClick={loginHandler}
                        >
                            login
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            register
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={redirectGoogleAuth}
                        >
                                Sign up
                        </Button>
                    </form>
                </Box>
            </Layout>
        </div>
    )
}

export default EntryPage
