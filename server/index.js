import express from "express";
import mongoose from "mongoose";
import cors from 'cors';

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors());
const databaseName = "formValidation";
const url = `mongodb://localhost:27017/${databaseName}`;

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    status: {
        type: String,
    },
    phone: {
        type: Number,
    },
    password: {
        type: String,
    },
    email: {
        type: String,
        unique: true
    },
    gender: {
        type: String,
    },
    dob: {
        type: String,
    },
    age: {
        type: String,
    },
}, { timestamps: true });


const UserModel = new mongoose.model("user", userSchema);


app.post('/createUser', async (req, res) => {
    try {
        const { email } = req.body;
        const isUserExist = await UserModel.findOne({ email });
        if (isUserExist) {
            return res.status(203).send({ msg: "user already exist" });
        }

        const userData = new UserModel(req.body);
        await userData.save();
        res.status(200).send({ msg: "success" });

    } catch (error) {
        res.status(404).send({ msg: "something went wrong" });
    }
})

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const isUserExist = await UserModel.findOne({ email });
        if (isUserExist && isUserExist.password == password) {
            await UserModel.updateOne({email}, {$set:{status:"active"}});
            isUserExist['status']= 'active';
            return res.status(200).send(isUserExist);
        }
        res.status(203).send({ msg: "User not found" });
    } catch (error) {
        res.status(404).send({ msg: "something went wrong" });
    }
})

app.post('/getUser', async (req, res) => {
    try {
        const allUsers = await UserModel.findOne({ _id: req.body.id });
        res.status(200).send(allUsers);
    } catch (error) {
        res.status(404).send({ msg: "something went wrong" });
    }
})

app.post('/deleteAccount', async (req, res) => {
    try {
        const { _id } = req.body;
        await UserModel.deleteOne({ _id });
        res.status(200).send({ msg: "user deleted" });
    } catch (error) {
        res.status(404).send({ msg: "something went wrong" });
    }
})

app.patch('/update', async (req, res) => {
    try {
        const { _id, name, email, phone, password, dob,age } = req.body;
        const update = {
            $set: { name, email, phone, password,dob, age}
        };
        await UserModel.updateOne({ _id }, update);
        res.status(200).send('Updated');
    } catch (error) {
        res.status(404).send({ msg: "something went wrong" });
    }
})

app.post('/logout', async (req, res) => {
    try {
        const { _id } = req.body;
        const update = {
            $set: { status : 'pending'}
        };
        console.log(req.body);
        await UserModel.updateOne({ _id }, update);
        res.status(200).send('Updated');
    } catch (error) {
        res.status(404).send({ msg: "something went wrong" });
    }
})

app.listen(5000, () => {
    console.log("server started at 5000");
})
