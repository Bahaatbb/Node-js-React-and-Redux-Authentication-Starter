const express = require('express');
const helmet = require("helmet");
const logger = require("morgan");
const cors = require("cors");
const connectDB = require('./config/db');
const dotenv = require("dotenv").config();
const path = require('path');

const app = express();

app.use(helmet());
app.use(logger("dev"));
app.use(cors());
app.use(express.json());

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());



app.use("/api", require('./routes/user'))
// routes
app.get("/", (req, res) => {
    res.send("Hello world!");
})



// error for unknown routes
app.use((req, res, next) => {
    const err = new Error("Not found");
    err.status = 404;
    next(err);
});

// error for invalid auth
app.use((err, req, res, next) => {
    const status = err.status || 500;
    res.status(status).json({ error: { message: err.message } });
});



// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
