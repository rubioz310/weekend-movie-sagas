import { useParams } from "react-router-dom";

function MovieDetails() {
    const { id } = useParams();

    return (
        <p>Movie Details {id}</p>
    )
}

export default MovieDetails;