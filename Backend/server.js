const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

const uri = "mongodb+srv://omkk:omkhedkar@cluster0.kr8jk.mongodb.net/MessLocator?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }
).then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err));

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});

const messRouter = require("./routes/messRoutes");
const usersRouter = require("./routes/userRoutes");
const menuRouter = require("./routes/menuRoutes");

app.use('/messes', messRouter);
app.use('/users', usersRouter);
app.use('/menu', menuRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
    console.log(uri);
});