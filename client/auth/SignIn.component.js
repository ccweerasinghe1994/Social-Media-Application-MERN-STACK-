import React, {useState} from 'react';
import {Redirect} from 'react-router-dom'

import {signin} from "./api-auth";
import {authenticate} from "./auth-helper";
import {Card, CardContent, makeStyles, Typography, TextField, Icon, CardActions, Button} from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    card: {
        maxWidth: 600,
        margin: 'auto',
        marginTop: theme.spacing(5)
    },
    title: {
        padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
        color: theme.palette.openTitle
    },
    media: {
        minHeight: 400
    }
}))

export const SignIn = (props) => {
    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        redirectToReferer: false
    })
    const handleChange = name => event => {
        setValues({...values, [name]: event.target.value})

    }
    const clickSubmit = () => {
        const user = {
            email: values.email || undefined,
            password: values.password || undefined
        }
        signin(user).then(data => {
            if (data.error) {
                setValues({
                    ...values, error: data.error
                })
            } else {
                authenticate(data, () => {
                    setValues({...values, error: "", redirectToReferer: true})
                })
            }
        }).catch(error => {
            console.log(error)
        })
    }
    const {from} = props.location.state || {
        from: {
            pathname: '/'
        }
    }
    const {redirectToReferer} = values;

    const {card, title, textField, error, submit} = useStyles();
    return (
        redirectToReferer ? <Redirect to={from}/> :
            <Card className={card}>
                <CardContent>
                    <Typography variant="h6" className={title}>Sign In</Typography>
                    <TextField className={textField} id='email' label='Email' value={values.email} margin={'normal'}
                               onChange={handleChange('email')}/>
                    <br/>
                    <TextField id='password' className={textField} label='Password' onChange={handleChange('password')}
                               value={values.password} margin={"normal"}/>
                    <br/>
                    {
                        values.error && (
                            <Typography color={"error"} component={"p"}>
                                <Icon color={"error"} className={error}>error</Icon>
                                {values.error}
                            </Typography>
                        )
                    }

                </CardContent>
                <CardActions>
                    <Button color={"primary"} className={submit} variant={"contained"}
                            onClick={clickSubmit}>Submit</Button>
                </CardActions>
            </Card>
    )
}