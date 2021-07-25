import { useHistory } from "react-router-dom";
//Material ui imports
import { Button, makeStyles } from "@material-ui/core";
import { HomeOutlined, Add } from '@material-ui/icons';


const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
      backgroundColor: '#f88470',
      padding: '20px',
      color: 'white',
    },
  }));

function Header() {
    const classes = useStyles();
    const history = useHistory();
    const addMovieView = () => {
        history.push('/add')
    }
    const homeView = () => {
        history.push('/')
    }
    return(
        <div className={classes.root}>
            <h1>The Movies Saga!</h1>
            <Button onClick={homeView} color='primary' variant='contained'><HomeOutlined />Home</Button>
            <Button onClick={addMovieView} color='primary' variant='contained'><Add />Add Movie</Button>
        </div>
    )
}

export default Header;