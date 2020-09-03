import React from "react";
import {makeStyles} from '@material-ui/core/styles'
import {Card, CardContent, CardMedia, Typography} from '@material-ui/core';
import homeImg from '../assets/a.jpg';
import {Link} from 'react-router-dom'


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

const Home = () => {
    const {card,media,title} = useStyles();
    return (
        <Card className={card}>
            <Typography variant="h6" className={title}>Home Page</Typography>
            <CardMedia className={media} image={homeImg} title='Well Come'/>
            <CardContent>
                <Typography variant={"body2"} component={"p"}>
                    Welcome to The Mern Social Home Page
                </Typography>
                <Link to="/users/">Users</Link>
                <br/>
                <Link to="/signup/">signUn</Link>
                <br/>
                <Link to="/signin/">signIn</Link>


            </CardContent>
        </Card>
    )
}

export default Home;