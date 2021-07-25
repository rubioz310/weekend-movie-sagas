import { useHistory } from "react-router-dom";

function Header() {
    const history = useHistory();
    const addMovieView = () => {
        history.push('/add')
    }
    const homeView = () => {
        history.push('/')
    }
    return(
        <div className='App-header'>
            <h1>The Movies Saga!</h1>
            <button onClick={addMovieView}>ADD MOVIE</button>
            <button onClick={homeView}>HOME</button>
        </div>
    )
}

export default Header;