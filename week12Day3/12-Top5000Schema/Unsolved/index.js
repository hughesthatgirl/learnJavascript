const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Your password
  password: 'jhsqlpass1006!',
  database: 'top_songsDB',
});

// SELECT title, firstName, lastName
// FROM books
// INNER JOIN authors ON books.authorId = authors.id;

const joinTables = () => {
  connection.query('SELECT artist FROM top5000 JOIN topAlbums ON top5000.year = topAlbums.year', (err, res) => {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.log(res);
    connection.end();
  });
}

connection.connect((err) => {
  if (err) throw err;
  joinTables();
});

// const runSearch = () => {
//   inquirer
//     .prompt({
//       name: 'action',
//       type: 'list',
//       message: 'What would you like to do?',
//       choices: [
//         'Find songs by artist',
//         'Find all artists who appear more than once',
//         'Find data within a specific range',
//         'Search for a specific song',
//         'exit',
//       ],
//     })
//     .then((answer) => {
//       switch (answer.action) {
//         case 'Find songs by artist':
//           artistSearch();
//           break;

//         case 'Find all artists who appear more than once':
//           multiSearch();
//           break;

//         case 'Find data within a specific range':
//           rangeSearch();
//           break;

//         case 'Search for a specific song':
//           songSearch();
//           break;

//         case 'exit':
//           connection.end();
//           break;

//         default:
//           console.log(`Invalid action: ${answer.action}`);
//           break;
//       }
//     });
// };

// const artistSearch = () => {
//   inquirer
//     .prompt({
//       name: 'artist',
//       type: 'input',
//       message: 'What artist would you like to search for?',
//     })
//     .then((answer) => {
//       const query = 'SELECT position, song, year FROM top5000 WHERE ?';
//       connection.query(query, { artist: answer.artist }, (err, res) => {
//         if (err) throw err;
//         res.forEach(({ position, song, year }) => {
//           console.log(
//             `Position: ${position} || Song: ${song} || Year: ${year}`
//           );
//         });
//         runSearch();
//       });
//     });
// };

// const multiSearch = () => {
//   const query =
//     'SELECT artist FROM top5000 GROUP BY artist HAVING count(*) > 1';
//   connection.query(query, (err, res) => {
//     if (err) throw err;
//     res.forEach(({ artist }) => console.log(artist));
//     runSearch();
//   });
// };

// const rangeSearch = () => {
//   inquirer
//     .prompt([
//       {
//         name: 'start',
//         type: 'input',
//         message: 'Enter starting position: ',
//         validate(value) {
//           if (isNaN(value) === false) {
//             return true;
//           }
//           return false;
//         },
//       },
//       {
//         name: 'end',
//         type: 'input',
//         message: 'Enter ending position: ',
//         validate(value) {
//           if (isNaN(value) === false) {
//             return true;
//           }
//           return false;
//         },
//       },
//     ])
//     .then((answer) => {
//       const query =
//         'SELECT position,song,artist,year FROM top5000 WHERE year BETWEEN ? AND ?';
//       connection.query(query, [answer.start, answer.end], (err, res) => {
//         if (err) throw err;
//         res.forEach(({ position, song, artist, year }) =>
//           console.log(
//             `Song: ${song} || Year: ${year}`
//           )
//         );
//         runSearch();
//       });
//     });
// };

// const songSearch = () => {
//   inquirer
//     .prompt({
//       name: 'song',
//       type: 'input',
//       message: 'What song would you like to look for?',
//     })
//     .then((answer) => {
//       console.log(`You searched for "${answer.song}"`);
//       connection.query(
//         'SELECT * FROM top5000 WHERE ?',
//         { song: answer.song },
//         (err, res) => {
//           if (err) throw err;
//           if (res[0]) {
//             res.forEach( (song) => {
//               console.log(
//                 `Position: ${song.position} || Song: ${song.song} || Artist: ${song.artist} || Year: ${song.year}`
//               );
//             })
//             runSearch();
//           } else {
//             console.error('Song not found :(\n');
//             runSearch();
//           }
//         }
//       );
//     });
// };