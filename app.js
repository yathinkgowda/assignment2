require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const User = require('./models/User');
const path = require('path');

const app = express();


app.use(express.static(path.join(__dirname, 'views')));



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use('/auth', authRoutes);


app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'register.html'));
});

app.get('/forgot-password', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'forgot-password.html'));

});


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/DATA', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});


const PORT = process.env.PORT || 2500;
app.listen(PORT, () => console.log(`Server running at: http://localhost:${PORT}`));
