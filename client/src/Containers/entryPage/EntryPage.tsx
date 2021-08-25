import React from 'react'
import { FormControl, InputLabel, Input, FormHelperText, Box, Button } from '@material-ui/core';
import Layout from '../../components/Layout/Layout'
import { useForm, SubmitHandler } from "react-hook-form";
import Icon from '@material-ui/core/Icon';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import classes from './EntryPage.module.scss'

type Inputs = {
    login: string,
    password: string,
};

const EntryPage: React.FC = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = data => {
        const {login , password} = data
        
    };

    return (
        <div className={classes.entryPage}>
            <Layout width={200}>
                <Box>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Box component="div">
                            <Input placeholder="login" {...register("login")} inputProps={{ 'aria-label': 'description' }} />
                        </Box>
                        <Box component="div">
                            <Input placeholder="password" {...register("password")} id="my-input" inputProps={{ 'aria-label': 'description' }} />
                        </Box>
                        <Button
                            variant="contained"
                            color="primary"
                            endIcon={<CloudUploadIcon />}
                            type="submit"
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
                            type="submit"
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
