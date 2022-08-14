const express = require("express");
const app = express();
const router = express.Router();
const path = require("path");
const PORT = 5000;
const mongoose = require("mongoose");
require("dotenv").config();
const Task = require("./models/Task");
const errorMiddleware = require("./middlewares/error");
const asyncWrapper = require("./middlewares/asyncWrapper");
const {ErrorClassification, createError} = require('./middlewares/errorClassification');
const routeNotFound = require('./middlewares/routeNotFound');

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Connect to db
mongoose
.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})
.then(() => console.log("Connect to DB successfully"))
.catch((err) => console.log(err));

router
.route("/")
.get(
  asyncWrapper(async (req, res) => {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  })
  )
  .post(
    asyncWrapper(async (req, res) => {
      const task = await Task.create(req.body);
      res.status(200).json({ task });
    })
    );
    
    router
    .route("/:id")
    .get(
      asyncWrapper(async (req, res, next) => {
        const task = await Task.findById(req.params.id);
        if (!task) {
          return next(createError('Not found that task', 404));
          //return next(createError('Not found that task', 404));
        }
        res.status(200).json({ task });
      })
      )
  .delete(
    asyncWrapper(async (req, res) => {
      await Task.findByIdAndRemove(req.params.id);
      res.status(200).json(req.params.id);
    })
    )
    .patch(asyncWrapper(async (req, res) => {
      const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!task) {
        return next(createError('Not found that task', 404));
      }
      res.status(200).json({ task });
    }));
    
app.use("/api/v1/tasks", router);

app.use(routeNotFound);
app.use(errorMiddleware);


app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
