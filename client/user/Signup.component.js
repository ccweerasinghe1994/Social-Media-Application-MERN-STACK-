import React, {useState} from "react";
import {create} from "./api-user";
import {makeStyles} from '@material-ui/core/styles'
import {
    Card,
    CardContent,
    CardActions,
    Typography,
    TextField,
    Icon,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions
} from '@material-ui/core';
import {Link} from "react-router-dom";


const useStyles = makeStyles(theme => ({
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

export const Signup = () => {
    const [values, setValues] = useState({
        name: '',
        password: '',
        email: '',
        open: false,
        error: ''
    })

    const handleChange = name => event => {
        setValues({...values, [name]: event.target.value})
    }
    const clickSubmit = () => {
        const user = {
            name: values.name || undefined,
            email: values.email || undefined,
            password: values.password || undefined
        }

        create(user).then(data => {
            if (data.error) {
                setValues({...values, error: data.error})
            } else {
                setValues({...values, error: "", open: true})
            }
        })
    }

    const { title, card, textField, error, submit} = useStyles();
    return (
        <Card className={card}>
            <CardContent>
                <Typography variant={"h6"} className={title}>Sign Up</Typography>
                <TextField id='name' label='Name' className={textField} value={values.name}
                           onChange={handleChange('name')} margin={"normal"}/>
                <br/>
                <TextField id='email' type='email' label='Email' className={textField} value={values.email}
                           onChange={handleChange('email')} margin={"normal"}/>
                <br/>
                <TextField id='password' type='password' label='Password' className={textField} value={values.password}
                           onChange={handleChange('password')} margin={"normal"}/>
                <br/>
                <br/>
                {
                    values.error && (
                        <Typography component={"p"} color={"error"}>
                            <Icon color={"error"} className={error}>error</Icon>
                            {values.error}
                        </Typography>
                    )
                }
                {
                    <Dialog open={values.open} disableBackdropClick={true}>
                        <DialogTitle>New Account</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                New Account Successfully Created
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Link to='/signin'>
                                <Button onClick={()=>setValues({...values,open: false})} variant={"contained"} color={"primary"} autoFocus={true}>Sign in</Button>
                            </Link>
                        </DialogActions>
                    </Dialog>

                }


            </CardContent>
            <CardActions>
                <Button color={"primary"} variant={"contained"} className={submit}
                        onClick={clickSubmit}>Submit </Button>
            </CardActions>
        </Card>
    )
}