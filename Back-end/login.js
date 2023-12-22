const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient } = require("mongodb");
const client = new MongoClient("mongodb+srv://gauthierlambeau:1808@movie.vbbwmal.mongodb.net/?retryWrites=true&w=majority");

app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());

app.get("/Users", async (req, res) => {
	try {
		await client.connect();

		const colli = client.db("login").collection("Users");
		const Users = await colli.find({}).toArray();

		res.status(200).send(Users);
	} catch (error) {
		console.log(error);
		res.status(500).send({
			error: "Something went wrong",
			value: error,
		});
	} finally {
		await client.close();
	}
});


app.post("/login", async (req, res) => {
    try {
        const { uname, psw } = req.body; 
        
        await client.connect();
        const colli = client.db("login").collection("Users");
        
        // Find the user by username
        const user = await colli.findOne({ username: uname });

        if (user) {
            if (user.password === psw) {
                res.status(200).send({ message: "Login successful" });
            } else {
                res.status(401).send({ error: "Invalid credentials" });
            }
        } else {
            res.status(401).send({ error: "User not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            error: "Something went wrong",
            value: error,
        });
    } finally {
        await client.close();
    }
});

app.post("/register", async (req, res) => {
    try {
        const { uname, psw } = req.body; 
        console.log("Received data:", uname, psw);
        
        await client.connect();
        const colli = client.db("login").collection("Users");
        
        // Check if the username already exists
        const existingUser = await colli.findOne({ username: uname });

        if (existingUser) {
            res.status(400).send({ error: "Username already exists" });
        } else {
            await colli.insertOne({ username: uname, password: psw });
            res.status(201).send({ message: "User created successfully" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            error: "Something went wrong",
            value: error,
        });
    } finally {
        await client.close();
    }
});


app.listen(3000);
console.log("app running at http://localhost:3000");


async function submitRegisterForm(event) {
    event.preventDefault(); 

    const form = document.getElementById('registerForm');
    const formData = new FormData(form);

    try {
        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                uname: formData.get('uname'),
                psw: formData.get('psw')
            })
        });

        if (response.ok) {
            console.log('Registration successful');
        } else {
            console.error('Registration failed');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}