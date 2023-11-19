

module.exports = (app, db) => {  
  // Endpoint 1 all animals
  app.get('/', (req, res) => {
    db.all(
      'SELECT * FROM animaltable',
      function(err, results) {
        if(err){
          res.send('An error occured with code: ' + err.code)
          console.log(err)
          return;
        }
        res.send(results)
      }
    )
  })

  // Endpoint 2 specifc animal by id
  app.get('/:animalId', (req, res) => {
    const animalId = req.params.animalId
    db.all(
      'SELECT * FROM animaltable WHERE id =' + animalId,
      function(err, results) {
        if(err){
          res.send('An error occured with code: ' + err.code)
          return;
        }
        res.send(results)
      }
    )
  })
}