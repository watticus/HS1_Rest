# Developer Candidate Take Home Test

Using best practices complete the following task:

Create a RESTful web service that takes a string of CSV data as input and returns the data reformatted as shown below without using regular expressions or a 3rd party CSV parser library, meaning the purpose of this project is to see how you solve a problem, not can you derive one or two regular expressions to complete the task in as few lines of code as possible.

---
Example input string:

``` CSV
"Patient Name","SSN","Age","Phone Number","Status"
"Prescott, Zeke","542-51-6641",21,"801-555-2134","Opratory=2,PCP=1"
"Goldstein, Bucky","635-45-1254",42,"435-555-1541","Opratory=1,PCP=1"
"Vox, Bono","414-45-1475",51,"801-555-2100","Opratory=3,PCP=2"
```

Return string for the above sample input:

``` TEXT
[Patient Name] [SSN] [Age] [Phone Number] [Status]
[Prescott, Zeke] [542-51-6641] [21] [801-555-2134] [Opratory=2,PCP=1]
[Goldstein, Bucky] [635-45-1254] [42] [435-555-1541] [Opratory=1,PCP=1]
[Vox, Bono] [414-45-1475] [51] [801-555-2100] [Opratory=3,PCP=2]
```

---

Installation Instructions

---

Clone the repository to the desired local directory.

From a terminal, run the following command to install dependencies:

``` bash
npm install
```

---

Running the Project

---
From a terminal window browse to the root of the project folder.

Run the following command to start the service:

```bash
npm start
```

The service will run on port 3000 and is accessible through localhost. A healtcheck endpoint can be accessed at the following URL and should return a message of "Healthy":

[http://localhost:3000/csv/healthcheck](http://localhost:3000/csv/healthcheck)

---

Running Tests

---

The tests are executed by running the following command from the terminal:

```bash
npm test
```

**NOTE:**  Ensure the service is running before the tests are executed as this will execute both unit and functional tests for the project.

---

Core Project Files

---

**./lib/convertCsv.js**

Contains the core work for taking the input string and replacing the quotation marks with the appropriate brackets. Functions include creating an array from an input string, parsing the array to replace the brackets and then concatenating the array back to a string with the proper format.


**./lib/parseBody.js**

Contains the functions for taking a block of text input and breaking it down to be passed into the convertCsv process. Functions include creating an array from input body, passing each array into the convertCsv process and returning the completed string block with the proper formatting.

**./routes/parseCsv.js**

Contains the code for the Express endpoints available for the service which are all accessible from the /csv route. These endpoints include the following:

- /healthcheck - Provides basic health of API
- /csvParameter - Takes a single string parameter in csv form and returns output
- /parseCsvBody - Takes a body of csv input and returns the formatted output

---

Test files

---

**./tests/convertCSV.test.js**

Contains the unit tests for the convertCsv.js functions.

**./tests/parseBody.test.js**

Contains the unit tests for the parseBody.js functions.

**./tests/routes.spec.js**

Contains the supertest functional tests for the API.
