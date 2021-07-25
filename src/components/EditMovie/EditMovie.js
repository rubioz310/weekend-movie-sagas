import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
//Material ui imports
import { Card, CardActions, CardContent, CardHeader, Chip,
     Divider, Grid, makeStyles, Paper, TextField } from "@material-ui/core";
//Material ui icons for buttons
import { Button } from "@material-ui/core";
import { SaveAlt, Close } from "@material-ui/icons";


     //styles used for the card
const useStyles = makeStyles(theme => ({
    root: {
        margin: '32px',
        padding: '24px',
        '& > *': {
            margin: theme.spacing(1),
          },
    },
    cardHeader: {
        background: 'cyan'
    },
    card:{
        background: '#ffebcd'
    },
    poster:{
        width: '280px'
    },
    chip:{
        margin: theme.spacing(1)
    },
}))

function EditMovie() {
    const { id } = useParams();
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();

    //Gets all genres when loading page
    useEffect(() => {
        dispatch({
            type: 'FETCH_DETAILS',
            payload: id
        });
        dispatch({
            type: 'FETCH_GENRES'
        })
    },[])
    const genres = useSelector(store => store.genres);

    //Movie object to send to server
    const newMovie = useSelector(store => store.movieDetails);

    //New genres on different state for simplicity
    const newGenres = useSelector(store => store.movieDetails.genres);

    const handleTitleChange = (event) => {
        dispatch({
            type: 'SET_TITLE',
            payload: event.target.value
        })
    }
    const handleDescriptionChange = (event) => {
        dispatch({
            type: 'SET_DESCRIPTION',
            payload: event.target.value
        })
    }
    const handlePosterChange = (event) => {
        dispatch({
            type: 'SET_POSTER',
            payload: event.target.value
        })
    }
    const handleGenresChange = (genre) => {
        dispatch({
            type: 'SET_NEW_GENRES',
            payload: [...newGenres,genre]
        })
    }
    const handleRemoveGenre = (genre) => {
        dispatch({
            type: 'REMOVE_GENRE',
            payload: genre
        })
    }

    const handleSave = () => {
        //makes sure all fields are not empty
        if(!newMovie.title || !newMovie.description || !newMovie.poster || newGenres.length === 0){
            return alert('Fill all empty field');
        }
        
        console.log();
        dispatch({
            type: 'PUT_MOVIE',
            //gets the id of all genres to be added
            payload: {... newMovie, genre_id: newGenres.map(genre => genres.find(g => g.name === genre).id)} 
        });
        //A confirmation message should show here *** Personal stretch ***
        //^^^^^^
        history.push('/');
    }
    //Go back to home if you cancel
    const handleCancel = () => {
        history.push('/');
    }

    return (
        <Paper elevation={4} className={classes.root}>
            <h2>Edit movie</h2>
            <Card className={classes.card}>
                {/* Card header has the input field for the title */}
                <CardHeader 
                    title={<TextField 
                            inputProps = {{style:{textAlign: 'center'}}}
                            fullWidth
                            placeholder='Title' value={newMovie.title} 
                            onChange={handleTitleChange}
                        />}
                    className={classes.cardHeader}>
                </CardHeader>
                <CardContent>
                    <Grid container item xs={12} spacing={2}>
                        <Grid item xs={12} sm={4} md={3}>
                            <TextField 
                                inputProps = {{style:{textAlign: 'center'}}}
                                multiline='true'
                                fullWidth
                                placeholder='Poster url' value={newMovie.poster} 
                                onChange={handlePosterChange}/>
                                <br/>
                            {newMovie.poster ? <img src={newMovie.poster}/>:null}
                        </Grid>
                        <Grid item xs={12} sm={8} md={9}>
                            <TextField 
                                inputProps = {{style:{textAlign: 'center'}}}
                                multiline='true'
                                fullWidth
                                placeholder='Movie description' value={newMovie.description} 
                                onChange={handleDescriptionChange}/>
                            <Divider />
                            {/* Show genres to be added */}
                            <p>ADDED GENRES</p>
                            {newGenres.sort().map(genre => (
                                <Chip value={genre} key={genre} label={genre} className={classes.chip}
                                    color='primary'
                                    onClick={event => handleRemoveGenre(genre)}
                                />
                            ))}
                            {/* Show all genres available to add. There is no visual cue when a genre is already added ***Personal stretch*** */}
                            <p><br/>ADD GENRES</p>
                            {genres.map(genre => (
                                <Chip value={genre.id} key={genre.id} label={genre.name} className={classes.chip}
                                variant='outlined'
                                color='secondary'
                                onClick={event => {
                                    if(!newGenres.includes(genre.name)){
                                        handleGenresChange(genre.name)
                                    }
                                }}/>
                            ))}
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            <br/>
            <Button onClick={handleSave} variant='contained' size='large' color='primary'><SaveAlt />SAVE</Button>
            <Button onClick={handleCancel} variant='contained' size='large' color='secondary'><Close />CANCEL</Button>
        </Paper>
        
    )
}
//Function used to sort genres to be added

export default EditMovie;