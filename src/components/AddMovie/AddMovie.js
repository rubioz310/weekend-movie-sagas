import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function AddMovie() {
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
        genre_id: 1
    })
    const history = useHistory();
    const handleSave = () => {
        if(!newMovie.title || !newMovie.description || !newMovie.poster){
            return alert('Fill all empty field');
        }
        console.log(newMovie);
        dispatch({
            type: 'POST_MOVIE',
            payload: newMovie
        });
        //A confirmation message should show here
        //^^^^^^
        history.push('/');
    }
    const handleCancel = () => {
        history.push('/');
    }


    return (
        <div>
            <p>Add movie</p>
            <input type='text' placeholder='Title' value={newMovie.title} 
                onChange={event => setNewMovie({...newMovie, title: event.target.value})}/>
            <textarea placeholder='description' value={newMovie.description} 
                onChange={event => setNewMovie({...newMovie, description: event.target.value})}/>
            <textarea placeholder='Poster url' value={newMovie.poster} 
                onChange={event => setNewMovie({...newMovie, poster: event.target.value})}/>
            <select onChange={event => setNewMovie({...newMovie, genre_id: event.target.value})}>
                {genres.map(genre => (
                    <option value={genre.id} key={genre.id} >{genre.name}</option>
                ))}
            </select>
            <button onClick={handleSave}>SAVE</button>
            <button onClick={handleCancel}>CANCEL</button>
        </div>
        
    )
}

export default AddMovie;