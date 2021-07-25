import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import './AddMovie.css';
import { Card, CardActions, CardContent, CardHeader, Chip,
     Divider, Grid, makeStyles, Paper, TextField, Typography } from "@material-ui/core";

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

function AddMovie() {
    const classes = useStyles();

    //Gets all genres when loading page
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({ type: 'FETCH_GENRES'});
    },[])
    const genres = useSelector(store => store.genres);

    //Movie object to send to server
    const [newMovie, setNewMovie] = useState({
        title: '',
        description: '',
        poster: '',
    })
    const [newGenres, setNewGenres] = useState([]);
    const history = useHistory();
    const handleSave = () => {
        if(!newMovie.title || !newMovie.description || !newMovie.poster || newGenres.length === 0){
            return alert('Fill all empty field');
        }
        console.log(newMovie);
        dispatch({
            type: 'POST_MOVIE',
            payload: {... newMovie, genre_id: newGenres.map(genre => genre.id)}
        });
        //A confirmation message should show here
        //^^^^^^
        history.push('/');
    }
    const handleCancel = () => {
        history.push('/');
    }


    return (
        <Paper elevation={4} className={classes.root}>
            <p>Add movie</p>
            
        <Card className={classes.card}>
            <CardHeader title={
                <TextField 
                    inputProps = {{style:{textAlign: 'center'}}}
                    fullWidth
                    placeholder='Title' value={newMovie.title} 
                    onChange={event => setNewMovie({...newMovie, title: event.target.value})}/>
            }className={classes.cardHeader}>
            
            </CardHeader>
            <CardContent>
                <Grid container item xs={12} spacing={2}>
                    <Grid item xs={12} sm={4} md={3}>
                        <TextField 
                            inputProps = {{style:{textAlign: 'center'}}}
                            multiline='true'
                            fullWidth
                            placeholder='Poster url' value={newMovie.poster} 
                            onChange={event => setNewMovie({...newMovie, poster: event.target.value})}/>
                            <br/>
                        {newMovie.poster ? <img src={newMovie.poster}/>:<img/>}
                    </Grid>
                    <Grid item xs={12} sm={8} md={9}>
                        <TextField 
                            inputProps = {{style:{textAlign: 'center'}}}
                            multiline='true'
                            fullWidth
                            placeholder='Movie description' value={newMovie.description} 
                            onChange={event => setNewMovie({...newMovie, description: event.target.value})}/>
                        <Divider />
                        <p>ADDED GENRES</p>
                        {newGenres.map(genre => (
                            <Chip value={genre.id} key={genre.id} label={genre.name} 
                            color='primary'
                            onClick={event => setNewGenres(newGenres.filter(item => item != genre))}/>
                        ))}
                         <p><br/>ADD GENRES</p>
                        {genres.map(genre => (
                            <Chip value={genre.id} key={genre.id} label={genre.name} 
                            variant='outlined'
                            color='secondary'
                            onClick={event => {
                                if(!newGenres.includes(genre)){
                                    setNewGenres([...newGenres, genre])
                                }
                            }}/>
                        ))}
                    </Grid>
                </Grid>
                <CardActions>
                    <button onClick={handleSave}>SAVE</button>
                    <button onClick={handleCancel}>CANCEL</button>
                </CardActions>
            </CardContent>
        </Card>
    </Paper>
        
    )
}

export default AddMovie;