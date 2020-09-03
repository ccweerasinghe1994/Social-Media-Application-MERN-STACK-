import React, {useEffect, useState} from 'react';
import {isAuthenticated} from "../auth/auth-helper";
import {read} from "./api-user";
import {Link, Redirect} from "react-router-dom";
import {
    makeStyles,
    Typography,
    Paper,
    List,
    ListItem,
    ListItemSecondaryAction,
    Avatar,
    ListItemAvatar,
    ListItemText,
    Divider, IconButton
} from '@material-ui/core'
import {Edit, Person} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    title: {
        padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
        color: theme.palette.openTitle
    }
}))
export const Profile = ({match}) => {
    const [user, setUser] = useState({});
    const [redirectToSignIn, setRedirectToSignIn] = useState(false);

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        const jwt = isAuthenticated();
        console.log('jwt:------------->',jwt);
        console.log('match.params.userId:------------->',match.params.userId);
        read({userId: match.params.userId}, {t: jwt.token}, signal).then((data) => {
            console.log("data:_____----_____-----___",data)
            if (data && data.error) {
                setRedirectToSignIn(true)
            } else {
                setUser(data)
            }
        })
        return function cleanup() {
            abortController.abort();
        }
    }, [match.params.userId]);
    const {title, root} = useStyles();
    return (redirectToSignIn ? (<Redirect to='/signin'/>) : (
        <Paper elevation={4} className={root}>
            <Typography className={title} variant={"h6"}>Profile</Typography>
            <List dense>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <Person/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={user.name} secondary={user.email}/>
                    {
                        isAuthenticated().user && isAuthenticated().user._id === user._id && (
                            <ListItemSecondaryAction>
                                <Link to={`/user/edit/${user._id}`}>
                                    <IconButton>
                                        <Edit/>
                                    </IconButton>
                                </Link>
                                <DeleteUser userId = {user._id} />
                            </ListItemSecondaryAction>
                        )
                    }
                </ListItem>
                <Divider/>
                <ListItem>
                    <ListItemText primary={`Joined ${(new Date(user.created)).toDateString()}`}/>
                </ListItem>
            </List>

        </Paper>
    ))
}