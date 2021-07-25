import { Card, CardContent, CardHeader, Chip, Divider, Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { IconButton } from "@material-ui/core";
import { Create, Delete } from "@material-ui/icons";
import { useHistory } from "react-router";

//Styles
const useStyles = makeStyles(theme => ({
    root: {
        margin: '32px',
        padding: '24px'
    },
    cardHeader: {
        background: 'cyan'
    },
    card:{
        background: '#ffebcd'
    },
    poster:{
        width: '280px'
    }
}))

function MovieDetails() {
    const dispatch = useDispatch();
    const classes = useStyles();
    const history = useHistory();

    //Selected movie id
    const { id } = useParams();
    
    //Gets all movie details
    useEffect(()=> {
        dispatch({
            type: 'FETCH_DETAILS',
            payload: id
        })
      },[]);
    const movieDetails = useSelector(store => store.movieDetails);
    
    //Send you to the edit view for the current movie
    const handleEdit = () => {
        history.push(`/edit/${id}`)
    }
    //This should delete the movie ****Personal stretch ******
    const handleDelete = () => {
        alert('Work in progress sorry')
    }

    return (
        <Paper elevation={4} className={classes.root}>
            <IconButton onClick={handleEdit}><Create /></IconButton>
            <IconButton onClick={handleDelete}><Delete /></IconButton>
            <Card className={classes.card}>
                <CardHeader title={movieDetails.title} className={classes.cardHeader}/>
                <CardContent>
                    <Grid container item xs={12} >
                        <Grid item xs={12} sm={4} md={3}>
                            <img src={movieDetails.poster} className={classes.poster}/>
                        </Grid>
                        <Grid item xs={12} sm={8} md={9}>
                            <Typography>Description {movieDetails.description}</Typography>
                            <Divider />
                            <Typography><br/>GENRES</Typography>
                            {movieDetails.genres.map(genre =>(
                                <Chip label={genre} />
                            ))}
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Paper>
    )
}

export default MovieDetails;