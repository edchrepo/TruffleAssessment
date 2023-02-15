const express = require("express");
const fs = require("fs");
const data = fs.readFileSync("data.json");
const Validator = require('jsonschema').Validator;
const app = express();
const PORT = 5000;

const medicalBills = JSON.parse(data);
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

app.listen(
    PORT,
    () => console.log(`Server is running on port: ${5000}`)
);

app.get('/items', (req, res) => {
    res.json(medicalBills);
});

const data1 = {
    "name": "11",
    "address": "22",
    "hospital": "33",
    "date": "44",
    "bill": 55
}

// console.log(v.validate(data1, billSchema).valid)

app.post('/items', (req, res) => {
    if (v.validate(data1, billSchema).valid) {
        medicalBills.push(data1);
        const newData = JSON.stringify(medicalBills);
        fs.writeFile("data.json", newData, (err) => {
            if (err) throw err;
            console.log("New data added");
        })
        res.json(JSON.parse(newData));
    }
    else {
        res.status(400).json({ message: "Invalid medical bill"})
    }
});

