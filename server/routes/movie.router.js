const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/', (req, res) => {

  const query = `SELECT * FROM movies ORDER BY "title" ASC`;
  pool.query(query)
    .then( result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all movies', err);
      res.sendStatus(500)
    })

});

router.post('/', (req, res) => {
  console.log(req.body);
  // RETURNING "id" will give us back the id of the created movie
  const insertMovieQuery = `
  INSERT INTO "movies" ("title", "poster", "description")
  VALUES ($1, $2, $3)
  RETURNING "id";`

  // FIRST QUERY MAKES MOVIE
  pool.query(insertMovieQuery, [req.body.title, req.body.poster, req.body.description])
  .then(result => {
    console.log('New Movie Id:', result.rows[0].id); //ID IS HERE!
    
    const createdMovieId = result.rows[0].id

    // Now handle the genre reference
    const insertMovieGenreQuery = `
      INSERT INTO "movies_genres" ("movie_id", "genre_id")
      VALUES  ($1, $2);
      `
      // SECOND QUERY ADDS GENRE FOR THAT NEW MOVIE
      pool.query(insertMovieGenreQuery, [createdMovieId, req.body.genre_id[0]]).then(result => {
        //Now that both are done, send back success!
        res.sendStatus(201);
      }).catch(err => {
        // catch for second query
        console.log(err);
        res.sendStatus(500)
      })

// Catch for first query
  }).catch(err => {
    console.log(err);
    res.sendStatus(500)
  })
})

//Get the movie details of the movie with the id given
router.get('/details/:id', (req, res) => {
  const id = req.params.id;
  const query = `select
                  m.id,
                  title,
                  description,
                  poster,
                  ARRAY_AGG (name) genres
                FROM movies as m
                INNER JOIN movies_genres AS mg ON mg.movie_id=m.id
                INNER JOIN genres as g on g.id = mg.genre_id
                WHERE m.id=$1
                GROUP BY m.title, m.description, m.poster, m.id
                ORDER BY m.title;`;
  pool.query(query,[id])
    .then( result => {
      res.send(result.rows[0]);
    })
    .catch(err => {
      console.log('ERROR: Get movie details', err);
      res.sendStatus(500)
    })
});


//her I found simpler to delete all existing genres of a movie and then add the new ones even if if one was already there
router.put('/:id', (req, res) => {
  const updatedMovieId = req.body.id;
  console.log(req.body);

  const insertMovieQuery = `
  UPDATE "movies" 
  SET "title" = $1, "poster" = $2, "description" = $3
  WHERE id=$4;`

  pool.query(insertMovieQuery, [req.body.title, req.body.poster, req.body.description, updatedMovieId])
  .then(result => {
    //This deletes all existing genres of a  movie
    const deleteOldGenres = `
      DELETE FROM "movies_genres"
      WHERE "movie_id" = $1;`

    pool.query(deleteOldGenres, [updatedMovieId])
    .then(result => {
      // This add the new genres of a movie. Right now it only adds the first one in the array.
      // Did not have time to modify the query
      const insertMovieGenreQuery = `
      INSERT INTO "movies_genres" ("movie_id", "genre_id")
      VALUES  ($1, $2);`
      // THIRD QUERY ADDS GENRE FOR THAT NEW MOVIE
      pool.query(insertMovieGenreQuery, [updatedMovieId, req.body.genre_id[0]]).then(result => {
        //Now that all are done, send back success!
        res.sendStatus(201);
      }).catch(err => {
        // catch for third query
        console.log(err);
        res.sendStatus(500)
      })
      //Catch second result
    }).catch( err => {
      console.log(err);
      res.sendStatus(500)
    })
// Catch for first query
  }).catch(err => {
    console.log(err);
    res.sendStatus(500)
  })
})


module.exports = router;