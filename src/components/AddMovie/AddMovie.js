import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function AddMovie() {
    const dispatch = useDispatch();
    const genres = useSelector(store => store.genres);
    useEffect(() => {
        dispatch({ type: 'FETCH_GENRES'});
    },[])
    return (
        <div>
            <p>Add movie</p>
            <input type='text' placeholder='Title' />
            <input type='textarea' placeholder='url' />
            <input type='textarea' placeholder='description' />
            <select>
                {genres.map(genre => (
                    <option value={genre.id}>{genre.name}</option>
                ))}
            </select>
        </div>
        
    )
}

export default AddMovie;