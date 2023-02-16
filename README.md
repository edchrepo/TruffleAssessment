# TruffleHealth Medical Bill API

> ### Simple medical bill upload service using Node and Express

# Getting started

To get the Node server running locally:

- Clone this repo
- `npm install` to install all required dependencies
- `npm start` to start the local server

# Endpoints

GET `/items` : Returns list of medical bills

POST `/items` : Creates a new medical bill

# Usage

When sending over data to create a new medical bill, it must have the 
following properties:

 - patient name and address

 - the hospital name

 - date of service

 - bill amount.
 
The app uses JSON to store medical bills with the above properties:
```
[
    {
        "name": "John Smith",
        "address": "48 Squaw Creek St. Peabody, MA 01960",
        "hospital": "Jones Medical Clinic",
        "date": "01/20/2023",
        "bill": 250
    }
]

```