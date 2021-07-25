import {HashRouter as Router, Route} from 'react-router-dom';
import './App.css';

//Components imports
import MovieList from '../MovieList/MovieList'
import MovieDetails from '../MovieDetails/MovieDetails';
import Header from './Header/Header';
import AddMovie from '../AddMovie/AddMovie';
import EditMovie from '../EditMovie/EditMovie';

function App() {
  return (
    <div className="App">
      
      <Router>    
      <Header />    
        <Route path="/" exact>
          <MovieList />
        </Route>
        {/* Details page */}
        <Route path='/details/:id' exact>
          <MovieDetails/>
        </Route>
        {/* Add Movie page */}
        <Route path='/add' exact>
          <AddMovie />
        </Route>
        <Route path='/edit/:id' exact>
          <EditMovie />
        </Route>
      </Router>
    </div>
  );
}


export default App;
