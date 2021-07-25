import { Card, CardContent, CardHeader, Divider, Grid, makeStyles, Paper, TextareaAutosize, Typography } from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Popper } from "@material-ui/core";
import { color } from "@material-ui/system";

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
    }
}))

function MovieDetails() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const classes = useStyles();
    const movieDetails = useSelector(store => store.movieDetails);
    useEffect(()=> {
        dispatch({
            type: 'FETCH_DETAILS',
            payload: id
        })
      },[]);

      //Takes care of opening the popper
      const [anchorEl, setAnchorEl] = useState(null);
      const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
      };
      const open = Boolean(anchorEl);

    return (
        <Paper elevation={4} className={classes.root}>
            <Card className={classes.card}>
                <CardHeader title={movieDetails.title} className={classes.cardHeader}/>
                <CardContent>
                    <Grid container item xs={12} >
                        <Grid item xs={12} sm={4} md={3}><img src={movieDetails.poster} onClick={handleClick} /></Grid>
                        <Grid item xs={12} sm={8} md={9}>
                            <Typography>Description {movieDetails.description}</Typography>
                            <Divider/>
                            <Typography>GENRES</Typography>
                            {movieDetails.genres.map(genre =>(
                                <p>{genre}</p>
                            ))}
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            <Popper open={open} anchorEl={anchorEl} placement='right-end'>
                <TextareaAutosize value={movieDetails.poster} rows='4' />
            </Popper>
        </Paper>
    )
}

export default MovieDetails;