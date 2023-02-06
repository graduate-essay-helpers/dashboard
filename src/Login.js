import { useState } from 'react';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { Route } from 'react-router-dom';
import axios from 'axios';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://graduate-essay-helpers.com">
                GraduateEssayHelpers
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function Login(props) {

    const [writer, setWriter] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setWriter({ ...writer, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {

        try {
            e.preventDefault();
            const sendData = {
                email: writer.email,
                password: writer.password,
            }

            axios.post("http://localhost:8000/essay-helpers/api/writerlogin.php", {
                // axios.post("https://graduate-essay-helpers.com/api/writerlogin.php", {
                email: sendData.email,
                password: sendData.password,
            })
                .then(res => {
                    console.log(res);

                    const id = res.data.writerlist.writerdata[0].id;

                    console.log(id);

                    axios.get(`http://localhost:8000/essay-helpers/api/getID.php?id=${id}`)
                        .then(res => {
                            console.log(res);

                            if (res.status == 200) {

                                // axios.post("http://localhost:8000/essay-helpers/api/writerassigned.php", {
                                //     // axios.post("https://graduate-essay-helpers.com/api/writerassigned.php", {
                                //     wrt_id: res.data.writerlist.writerdata[0].id,
                                // })
                                //     .then(rslt => {
                                //         console.log(rslt);
                                //         const tskVal = rslt;

                                //         // props.history.push({ pathname: "/assigned-tasks", state: { wrtDt: res.data.writerlist.writerdata, tskDt: tskVal.data.orderlist.orderdata } })

                                window.location.href = "dashboard";

                                //         window.localStorage.setItem('email', res.data.writerlist.writerdata[0].email);
                                //         window.localStorage.setItem('name', res.data.writerlist.writerdata[0].name);

                                //     })


                            }
                            else if (writer.email == "" || writer.password == "") {
                                alert("Please fill in all required fields");
                            }
                            else {
                                alert("Invalid user details. Try again!")
                            }

                        })

                })
        }
        catch (error) { throw error; }
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Username or Email"
                            name="email"
                            autoComplete="email"
                            type="text"
                            autoFocus
                            onChange={handleChange}
                            value={writer.email}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={handleChange}
                            value={writer.password}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="/forgot-password" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            {/* <Grid item>
                                <Link href="/register" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid> */}
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
                {/* <Button
                    onClick={showCont}
                >press</Button> */}
            </Container>
        </ThemeProvider>
    );
}