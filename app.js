var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
const { Pool } = require("pg");

var usersRouter = require("./routes/usersEndpoints");
var leagueRouter = require("./routes/leagueEndpoints");
var csgoRouter = require("./routes/csgoEndpoints");
var smiteRouter = require("./routes/smiteEndpoints");
var connectionsRouter = require("./routes/connectionsEndpoints");
var filterUsersRouter = require("./routes/filterUsersEndpoints");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.set(
    "pgpool",
    new Pool({
        connectionString:
            "postgres://zlxbxodokmyjop:52bb3e95df7096bd3f431d55c95a982e1efe652729977df504cb3803c0a426e5@ec2-34-197-84-74.compute-1.amazonaws.com:5432/dahslvt710uisv",
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    })
);

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "/frontend/build")));

app.use("/users", usersRouter);
app.use("/league", leagueRouter);
app.use("/csgo", csgoRouter);
app.use("/smite", smiteRouter);
app.use("/connections", connectionsRouter);
app.use("/filterusers", filterUsersRouter);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/frontend/build/index.html"));
});

var port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`App running on port ${port}`);
});

module.exports = app;
