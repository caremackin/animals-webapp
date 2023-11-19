const sqlite3 = require('sqlite3').verbose(); 

const db = new sqlite3.Database('./db/animaldb.sqlite', sqlite3.OPEN_CREATE | sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to the database.');

    db.run(`
      CREATE TABLE IF NOT EXISTS animaltable (
        id INTEGER PRIMARY KEY,
        name TEXT,
        description TEXT,
        image TEXT
      )
    `, (err) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log('Table created successfully.');

        // Insert data into the table
        const insertQuery = `INSERT INTO animaltable (id, name, description, image) VALUES 
        (?, ?, ?, ?),
        (?, ?, ?, ?),
        (?, ?, ?, ?),
        (?, ?, ?, ?),
        (?, ?, ?, ?),
        (?, ?, ?, ?),
        (?, ?, ?, ?),
        (?, ?, ?, ?),
        (?, ?, ?, ?),
        (?, ?, ?, ?)`;
        const values = 
        [1, 'Tiger', 'Big orange kitty', './assets/dogtiger.jpg',
        2, 'Lion', 'Fluffy yellow kitty','./assets/doglion.jpg',
        3, 'Wolf','Big puppy','./assets/wolf.jpg',
        4, 'Elephant', 'Grey big guy','./assets/elephant.jpg',
        5,'Cat','Fluffy but evil','./assets/cat.jpg',
        6,'Dog','Cutie dummy','./assets/dog.jpg',
        7,'Parrot','Repeats you bird','./assets/parrot.jpg',
        8,'Alligator','Big lizard','./assets/alligator.jpg',
        9,'Cow','Makes milk','./assets/cow.jpg',
        10,'Snake','Noodle pet','./assets/snake.jpg'
        ];

        db.run(insertQuery, values, function(err) {
          if (err) {
            return console.error(err.message);
          }
          console.log(`A new row id ${this.lastID}`);
          
          db.close((err) => {
            if (err) {
              console.error(err.message);
            } else {
              console.log('Closed the database connection.');
            }
          });
        });
      }
    });
  }
});
