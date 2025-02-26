var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const { default: mongoose } = require("mongoose");
require("./model/Category");
require("./model/Product");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var sanphamRouter = require("./routes/products");
var sinhvienRouter = require("./routes/sinhvien");
var lab3Router = require("./routes/lab3");


var app = express();

  const swaggerUi = require("swagger-ui-express");
  const swaggerDocument = require("./swagger_config");
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
// link đầu tiên
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/sanpham", sanphamRouter);
app.use("/sinhvien", sinhvienRouter);
app.use("/lab3", lab3Router);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
mongoose
  // .connect("mongodb://localhost:27017/test", {})
  .connect("mongodb+srv://isorahoang:XKjbqS91ukZRegti@reactapi.c3jg9um.mongodb.net/", {})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));


module.exports = app;
