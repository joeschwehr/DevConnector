const express = require('express');
const connectDB = require('./config/db');

const app = express();

//connect to mongoDB
connectDB();

app.get('/', (req, res) => {
    res.send('Hi, there, courtland');
});

//init middleware... formerly bodyparser
app.use(express.json({ extended: false }));

//define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('Listening on port', PORT));
