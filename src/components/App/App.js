import {HashRouter as Router, Route} from 'react-router-dom';
import './App.css';

//Components imports
import MovieList from '../MovieList/MovieList'
import MovieDetails from '../MovieDetails/MovieDetails';
import Header from './Header/Header';
import AddMovie from '../AddMovie/AddMovie';

function App() {
  return (
    <div className="App">
      
      <Router>    
      <Header />    
        <Route path="/" exact>
          <MovieList />
        </Route>
        {/* Details page */}
        <Route path='/details' exact>
          <MovieDetails/>
        </Route>
        {/* Add Movie page */}
        <Route path='/add' exact>
          <AddMovie />
        </Route>
      </Router>
    </div>
  );
}


export default App;
