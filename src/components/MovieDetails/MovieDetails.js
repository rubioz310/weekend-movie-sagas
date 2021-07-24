import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function MovieDetails() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const movieDetails = useSelector(store => store.movieDetails);
    useEffect(()=> {
        dispatch({
            type: 'FETCH_DETAILS',
            payload: id
        })
      },[]);
    
    return (
        <div>
            <p>Movie Details {id}</p>
            <p>Title {movieDetails.title}</p>
            <p>Description {movieDetails.description}</p>
            {movieDetails.genres.map(genre =>(
                <p>{genre}</p>
            ))}
            <img src={movieDetails.poster}/>
            
        </div>
    )
}

export default MovieDetails;