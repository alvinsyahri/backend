// untuk running ketikkan saja node .\seed.js

const mongoose = require("mongoose")
const User = require("./model/User")
const Category = require("./model/Category")
require('dotenv').config();

async function seedData() {
    // Connection URL
    const password = `${process.env.PASS_MONGODB}`;
    const encodedPassword = encodeURIComponent(password);
    const url = `mongodb+srv://${process.env.USER_MONGODB}:${encodedPassword}@cluster0.1cqjyzp.mongodb.net/inventoris?retryWrites=true&w=majority`;
    mongoose.set("strictQuery", false);
    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log("Connected to db")
    }).catch((err) => {
        console.log("error", err)
    })
    const user = {
        name: 'Admin',
        username: 'admin',
        password: 'rahasia',
        isAdmin: true
    }

    const category = [
        {
            name: 'Disposable',
        },
        {
            name: 'Not Disposable'
        }
    ]
    const seedDB = async () => {
        await User.create(user)
        await Category.create(category[0])
        await Category.create(category[1])
    }

    seedDB().then(() => {
        mongoose.connection.close()
        console.log("seed success")
    })
}

seedData()