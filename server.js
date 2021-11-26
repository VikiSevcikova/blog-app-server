const express = require('express');
const dotenv = require('dotenv');

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const postRoute = require('./routes/posts');

const mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('Database connected...');
})
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get('/', (req, res) => {
    res.send('ENDPOINT');
})

app.use('/auth', authRoute);
app.use('/user', userRoute);
app.use('/posts', postRoute);

app.listen(PORT, () => {
    console.log(`Server Running at port ${PORT}`)
});