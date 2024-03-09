const express = require('express');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

//middleware to parse form data.
app.use(express.urlencoded({ extended: true }));


// Greeting text
app.get('/', (req, res) => {
  res.send('Hello Welcome to the Homepage');
});

// Route to show the form
app.get('/create', (req, res) => {
  res.send(`<form action="/add" method="post"><input type="text" name="userName" placeholder="user name" /><button type="submit">Submit</button></form>`);
});

// Route to handle adding a user
app.post('/add', (req, res) => {
  const userName = req.body.userName;
  console.dir(req.body.formdata);
  fs.appendFile('users.txt', userName + '\n', (err) => {
    if (err) throw err;
    console.log('User added!');
    res.redirect('/users');
  });
});

// Route to show all users
app.get('/users', (req, res) => {
  fs.readFile('users.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.redirect('/create');
      return;
    }
    const users = data.split('\n').filter(user => user.trim() !== '');
    if (users.length === 0) {
      res.redirect('/create');
      return;
    }
    res.send(users.join('<br>'));
  });
});

// Starting the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
