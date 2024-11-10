import mongoose from "mongoose";
import express from "express";
import {Employee} from './models/employee.js';
import cors from 'cors';

const app = express();
const port = 3000;

let names = ['harry', 'madhuri', 'bhide', 'jethalal', 'popatlal', 'daya', 'komal', 'hathi', 'mehta', 'babita'];
let salaries = [10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000];
let cities = ['mumbai', 'delhi', 'karnal', 'kurukshetra', 'goa', 'pune', 'jammu', 'kashmir', 'ladakh', 'rohtak'];
let languages = ['c', 'c++', 'python', 'R', 'java', 'javascript', 'sql', 'assembly', 'ml', 'c'];

function chooseRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

async function startServer() {
    try {
        await mongoose.connect("mongodb://localhost:27017/company");
        console.log("Connected to MongoDB");

        app.get("/generate", async (req, res) => {
            console.log('Generate route was accessed'); // Log when the route is hit
            await Employee.deleteMany({}); // Clear existing data
            for (let i = 0; i < 10; i++) {
                const employee = new Employee({
                    name: chooseRandom(names),
                    salary: chooseRandom(salaries),
                    city: chooseRandom(cities),
                    language: chooseRandom(languages),
                    isManager: chooseRandom([true, false])
                });
                await employee.save();
            }
            res.send('The collection is created');
        });

        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`);
        });
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

app.use(cors());
// Start the server
startServer();
