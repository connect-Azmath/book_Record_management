const express = require("express");
// const {users} = require("./data/users.json");

//Import Routes
const userRouter = require("./routes/users.js");
const booksRouter = require("./routes/books.js");
// const rout = require("./")

const app = express();

const port = 8081;

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Server is up & Running..."
    });
});

app.use("/users", userRouter);
app.use("/books", booksRouter);


app.get("*", (req, res) => {
    res.status(400).json({
        message: "I am not present "
    })
})

app.listen(port, () => {
    console.log(`Server is Listn ing at port ${port}`);
});