import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import './AddMovie.css';
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

function AddMovie() {
    const classes = useStyles();
    const history = useHistory();

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

    //New genres on different state for simplicity
    const [newGenres, setNewGenres] = useState([]);

    const handleSave = () => {
        //makes sure all fields are not empty
        if(!newMovie.title || !newMovie.description || !newMovie.poster || newGenres.length === 0){
            return alert('Fill all empty field');
        }
        dispatch({
            type: 'POST_MOVIE',
            payload: {... newMovie, genre_id: newGenres.map(genre => genre.id)} //gets the id of all genres to be added
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
            <h2>Add movie</h2>
            <Card className={classes.card}>
                {/* Card header has the input field for the title */}
                <CardHeader 
                    title={<TextField 
                            inputProps = {{style:{textAlign: 'center'}}}
                            fullWidth
                            placeholder='Title' value={newMovie.title} 
                            onChange={event => setNewMovie({...newMovie, title: event.target.value})}/>}
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
                                onChange={event => setNewMovie({...newMovie, poster: event.target.value})}/>
                                <br/>
                            {newMovie.poster ? <img src={newMovie.poster}/>:null}
                        </Grid>
                        <Grid item xs={12} sm={8} md={9}>
                            <TextField 
                                inputProps = {{style:{textAlign: 'center'}}}
                                multiline='true'
                                fullWidth
                                placeholder='Movie description' value={newMovie.description} 
                                onChange={event => setNewMovie({...newMovie, description: event.target.value})}/>
                            <Divider />
                            {/* Show genres to be added */}
                            <p>ADDED GENRES</p>
                            {newGenres.sort(compare).map(genre => (
                                <Chip value={genre.id} key={genre.id} label={genre.name} className={classes.chip}
                                color='primary'
                                onClick={event => setNewGenres(newGenres.filter(item => item != genre))}/>
                            ))}
                            {/* Show all genres available to add. There is no visual cue when a genre is already added ***Personal stretch*** */}
                            <p><br/>ADD GENRES</p>
                            {genres.map(genre => (
                                <Chip value={genre.id} key={genre.id} label={genre.name} className={classes.chip}
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
                </CardContent>
            </Card>
            <br/>
            <Button onClick={handleSave} variant='contained' size='large' color='primary'><SaveAlt />SAVE</Button>
            <Button onClick={handleCancel} variant='contained' size='large' color='secondary'><Close />CANCEL</Button>
        </Paper>
        
    )
}
//Function used to sort genres to be added
function compare( a, b ) {
    if ( a.name < b.name ){
      return -1;
    }
    if ( a.name > b.name ){
      return 1;
    }
    return 0;
  }
export default AddMovie;