const port = process.env.PORT || 3000;

const dotenv = require("dotenv");
dotenv.config();
const express = require("express");

const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const tasksRoutes = require("./routes/tasksRoutes");
// const bookingRoutes = require('./routes/bookingRoutes');
const logoutRoutes = require("./routes/logout");
const methodOverride = require("method-override");
const connectToDatabase = require("./connection");
const usersRouter = require("./controllers/users");
const profilesRouter = require("./controllers/profiles");


const allowedOrigins = [
  "https://taskify-frontend.onrender.com/", 
  // "http://localhost:5173", 
  // "http://localhost:5174", 
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, 
}));

app.options('*', cors()); 

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
connectToDatabase();

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/users", usersRouter);
app.use("/profiles", profilesRouter);

app.use("/tasks", tasksRoutes);
app.use("/logout", logoutRoutes);
app.use(methodOverride("_method"));

// 404 error handler
app.use((req, res) => {
  res.status(404).send("Not found");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
