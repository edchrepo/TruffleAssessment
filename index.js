const express = require("express");
const fs = require("fs");
const data = fs.readFileSync("data.json");
const Validator = require('jsonschema').Validator;
const app = express();
const PORT = 5000;

//setting up middleware parser to properly send requests
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

const medicalBills = JSON.parse(data);

//creating JSON schema validator to validate JSON POST requests 
const v = new Validator();

const billSchema = {
    "id": "Medical Bill",
    "type": "object",
    "properties": {
        "name": {"type": "string"},
        "address": {"type": "string"},
        "hospital": {"type": "string"},
        "date": {"type": "string"},
        "bill": {"type": "number"}
    },
    "required": ["name", "address", "hospital", "date", "bill"]
};

v.addSchema(billSchema, 'Medical Bill');

// GET /items returns full list of medical bills from stored data.json file
app.get('/items', (req, res) => {
    res.json(medicalBills);
});

// POST /items validates req data with schema model and updates data.json file
// by adding valid req data (new medical bill) onto full list of medical bills

app.post('/items', (req, res) => {
    const billData = req.body;
    if (v.validate(billData, billSchema).valid) {
        medicalBills.push(billData);
        const newData = JSON.stringify(medicalBills);
        fs.writeFile("data.json", newData, (err) => {
            if (err) throw err;
            console.log("New data added");
        })
        res.json(medicalBills);
    }
    else {
        res.status(400).json({ message: "Invalid medical bill"})
    }
});

app.listen(
    PORT,
    () => console.log(`Server is running on port: ${5000}`)
);

