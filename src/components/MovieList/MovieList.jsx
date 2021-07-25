import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MovieItem from '../MovieItem/MovieItem';
import './MovieList.css'
import { Grid } from '@material-ui/core';

function MovieList() {

    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    return (
        <main>
            <h1>MovieList</h1>

            <div style={{padding: 30 }}>
                <Grid container spacing={4} justifyContent="center" >
                    {movies.map(movie => {
                        return (
                            <Grid item  xs={8} sm={4} md={3} lg={2}>
                                <MovieItem movie={movie} key={movie.id}/>
                            </Grid>
                        );
                    })}
                </Grid>
            </div>
        </main>

    );
}

export default MovieList;