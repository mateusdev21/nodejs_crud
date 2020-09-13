const express = require("express");
const app = express();

const db = require("./config/db");

app.get("/", (req,res) => res.send("Respond Node.js Successful"));

app.use(express.urlencoded({extended: true}));

db.authenticate().then(() => console.log("Database connection successful"));

const User = require("./models/User");

// membuat router utk post ke dalam tabel user di database
app.post("/crud", async (req,res) => {
    try {
        const {username, email, password} = req.body;

        const newUser = new User ({
            username, email, password
        });

        await newUser.save();

        res.json(newUser);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// membuat router utk get (menampilkan) isi dari tabel user di database
app.get("/crud", async (req, res) => {
    try {
        const getAllUser = await User.findAll({});
        res.json(getAllUser);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// membuat router utk get (menampilkan) 1 data berdasarkan id dari tabel user di database
app.get("/crud/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const getUser = await User.findOne({
            where: {id:id}
        });
        res.json(getUser);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Membuat router utk delete sebuah data menurut id nya dari tabel user di database
app.delete("/crud/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const deleteUser = await User.destroy({
            where: {id:id}
        });

        await deleteUser;

        res.json("Delete Successful");
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Membuat router utk meng-update sebuah data menurut id nya dari tabel user di database
app.put("/crud/:id", async (req,res) => {
    try {
        const {username,email,password} = req.body;
        const id = req.params.id;
        const updateUser = await User.update({
            username, email, password
        }, {where: {id:id}});
        await updateUser;
        res.json("Update User Successful");
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// membuat server di port 4500
app.listen(4500, () => console.log("Server running on port 4500"));