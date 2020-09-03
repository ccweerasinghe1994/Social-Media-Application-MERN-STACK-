import React from 'react';
import {useState, useEffect} from "react";
import {list} from "./api-user";
import {makeStyles} from '@material-ui/core/styles';
import {
    Paper,
    Typography,
    List,
    ListItem,
    Avatar,
    ListItemAvatar,
    ListItemText,
    ListItemSecondaryAction,
    IconButton
} from "@material-ui/core";
import {Link} from "react-router-dom";
import {Person, ArrowForward} from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
    title: {
        padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
        color: theme.palette.openTitle
    }
}))

export const User = () => {


    const [users, setUsers] = useState([]);

    useEffect(
        () => {
            const abortController = new AbortController();
            const signal = abortController.signal;
            list(signal).then((data) => {
                if (data && data.error) {
                    console.log(data.error)
                } else {
                    setUsers(data)
                }
            })
            return function cleanUp() {
                abortController.abort();
            }
        }, []
    );
    const {root, title} = useStyles();
    return (
        <Paper classes={root} elevation={4}>
            <Typography variant='h6' className={title}>All Users</Typography>
            <List dense>
                {
                    users.map((item, i) => {
                        return (
                            <Link to={"/user/" + item._id} key={i}>
                                <ListItem button>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <Person/>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={item.name}/>
                                    <ListItemSecondaryAction>
                                        <IconButton>
                                            <ArrowForward/>
                                        </IconButton>
                                    </ListItemSecondaryAction>


                                </ListItem>
                            </Link>
                        )
                    })
                }
            </List>
        </Paper>
    )
}