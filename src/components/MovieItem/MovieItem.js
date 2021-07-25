import { useHistory } from "react-router-dom";
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import { Info, InfoTitle } from '@mui-treasury/components/info';
import { useGalaxyInfoStyles } from '@mui-treasury/styles/info/galaxy';
import { useCoverCardMediaStyles } from '@mui-treasury/styles/cardMedia/cover';

//Styles
const useStyles = makeStyles(() => ({
    card: {
      borderRadius: '1rem',
      boxShadow: 'none',
      position: 'relative',
      height: 360,
      width: 200,
      '&:after': {
        content: '""',
        display: 'block',
        position: 'absolute',
        width: '100%',
        height: '64%',
        bottom: 0,
        zIndex: 1,
        background: 'linear-gradient(to top, #000, rgba(0,0,0,0))',
      },
      '&:hover': {
          transform: 'scale(1.1)',
          cursor: 'pointer',
          boxShadow: `0 6px 12px 0 black`,
      }
    },
    content: {
      position: 'absolute',
      zIndex: 2,
      bottom: 0,
    },
  }));
  

function MovieItem({movie}) {
    const history = useHistory();
    const mediaStyles = useCoverCardMediaStyles({ bgPosition: 'top' });
    const styles = useStyles();

    const handleClick = () => {
        history.push(`/details/${movie.id}`)
    }

    return (
        <>
          <Card className={styles.card} onClick={handleClick}>
            <CardMedia
              classes={mediaStyles}
              image={movie.poster}
            />
            <Box py={3} px={2} className={styles.content}>
              <Info useStyles={useGalaxyInfoStyles}>
                <InfoTitle>{movie.title}</InfoTitle>
              </Info>
            </Box>
          </Card>
        </>
      );
}

export default MovieItem;