import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('FETCH_MOVIES', fetchAllMovies);
    yield takeEvery('FETCH_DETAILS', fetchDetails);
    yield takeEvery('FETCH_GENRES', fetchGenres);
    yield takeEvery('POST_MOVIE', postMovie);
    yield takeEvery('PUT_MOVIE', putMovie)
}

function* fetchAllMovies() {
    // get all movies from the DB
    try {
        const movies = yield axios.get('/api/movie');
        console.log('get all:', movies.data);
        yield put({ type: 'SET_MOVIES', payload: movies.data });

    } catch {
        console.log('get all error');
    }
        
}
function* fetchDetails(action) {
    // Get details from selected movie
    try {
        const details = yield axios.get(`/api/movie/details/${action.payload}`);
        console.log('get details:', details.data);
        yield put({ type: 'SET_DETAILS', payload: details.data });
    } catch {
        console.log('get details error');
    }
        
}
function* fetchGenres() {
    // Get all genres
    try {
        const genres = yield axios.get(`/api/genre`);
        console.log('get genre:', genres.data);
        yield put({ type: 'SET_GENRES', payload: genres.data });
    } catch {
        console.log('get genres error');
    }
}

function* postMovie(action) {
    try {
        yield axios.post('api/movie', action.payload);
    } catch {
        console.log(('Add movie error'));
    }
}
function* putMovie(action) {
    console.log(action);
    try {
        yield axios.put(`api/movie/${action.payload.id}`, action.payload);
    } catch {
        console.log(('Edit movie error'));
    }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store details of a movie returned from the server
const movieDetails = (state = {
    genres: []
}, action) => {
    switch (action.type) {
        case 'SET_DETAILS':
            return action.payload;
        case 'SET_TITLE':
            return {...state, title: action.payload }
        case 'SET_DESCRIPTION':
            return {...state, description: action.payload }
        case 'SET_POSTER':
            return {...state, poster: action.payload }
        case 'SET_NEW_GENRES':
            return {...state, genres: action.payload }
        case 'REMOVE_GENRE':
            return {...state, genres: state.genres.filter(genre => genre != action.payload)}
        default:
            return state;
    }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
        movieDetails,
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={storeInstance}>
        <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
