import { useHistory } from "react-router-dom";

function MovieItem({movie}) {
    const history = useHistory();

    const handleClick = () => {
        history.push(`/details/${movie.id}`)
    }

    return (
        <div key={movie.id} >
            <h3>{movie.title}</h3>
            <input type='image' src={movie.poster} alt={movie.title} onClick={handleClick}/>
        </div>
    )
}

export default MovieItem;