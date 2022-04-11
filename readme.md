# CSV to Bracket formating 
**Example input string:**

``` CSV
"Patient Name","SSN","Age","Phone Number","Status"
"Prescott, Zeke","542-51-6641",21,"801-555-2134","Opratory=2,PCP=1"
"Goldstein, Bucky","635-45-1254",42,"435-555-1541","Opratory=1,PCP=1"
"Vox, Bono","414-45-1475",51,"801-555-2100","Opratory=3,PCP=2"
```

**Return string for the above sample input:**

``` TEXT
[Patient Name] [SSN] [Age] [Phone Number] [Status]
[Prescott, Zeke] [542-51-6641] [21] [801-555-2134] [Opratory=2,PCP=1]
[Goldstein, Bucky] [635-45-1254] [42] [435-555-1541] [Opratory=1,PCP=1]
[Vox, Bono] [414-45-1475] [51] [801-555-2100] [Opratory=3,PCP=2]
```

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li>
        <a href="#usage">Usage</a>
        <ul>
            <li><a href="#start-the-api">Start the API</a>
            <li><a href="#run-the-tests">Run the Tests</a>
    </li>
    <li><a href="#core-project-files">Core Project Files</a></li>
    <li><a href="#test-files">Test Files</a></li>
    <li><a href="#postman-collection">Postman Collection</a></li>
  </ol>
</details>

---
<!-- ABOUT THE PROJECT -->
## About The Project

This is a Developer Candidate Take Home Test I have been asked to complete.

Using best practices complete the following task:

Create a RESTful web service that takes a string of CSV data as input and returns the data reformatted as shown below without using regular expressions or a 3rd party CSV parser library, meaning the purpose of this project is to see how you solve a problem, not can you derive one or two regular expressions to complete the task in as few lines of code as possible.

<p align="right">(<a href="#top">back to top</a>)</p>



### Built With

* [Express.js](https://nextjs.org/)


<p align="right">(<a href="#top">back to top</a>)</p>


---
<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.
<br /><br />
### Prerequisites

The installation instructions require NPM. If the following command does not work please install NodeJS.
* npm
  ```sh
  npm install npm@latest -g
  ```
<br />

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/watticus/HS1_Rest.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```

<p align="right">(<a href="#top">back to top</a>)</p>


---
<!-- USAGE  -->
## Usage

<br />

### Start the API
Run the following command to start the service:

```bash
npm start
```

The service will run on port 3000. A healtcheck endpoint can be accessed at the following URL to verify the API is running:

[http://localhost:3000/csv/healthcheck](http://localhost:3000/csv/healthcheck)


### Run the tests
The tests are executed by running the following command from the terminal:

```bash
npm test
```

**NOTE:**  Ensure the service is running before the tests are executed as this will execute both unit and functional tests for the project.

<p align="right">(<a href="#top">back to top</a>)</p>


---
## Core Project Files

**./lib/convertCsv.js**
<br>
Contains the core work for taking the input string and replacing the quotation marks with the appropriate brackets. Functions include creating an array from an input string, parsing the array to replace the brackets and then concatenating the array back to a string with the proper format.
<br /><br />

**./lib/parseBody.js**
<br />
Contains the functions for taking a block of text input and breaking it down to be passed into the convertCsv process. Functions include creating an array from input body, passing each array into the convertCsv process and returning the completed string block with the proper formatting.
<br /><br />

**./routes/parseCsv.js**
<br />
Contains the code for the Express endpoints available for the service which are all accessible from the /csv route. These endpoints include the following:

- /healthcheck - Provides basic health of API
- /csvParameter - Takes a single string parameter in csv form and returns output
- /parseCsvBody - Takes a body of csv input and returns the formatted output

---
## Test files

**./tests/convertCSV.test.js**
<br />
Contains the unit tests for the convertCsv.js functions.

**./tests/parseBody.test.js**
<br />
Contains the unit tests for the parseBody.js functions.

**./tests/routes.spec.js**
<br />
Contains the supertest functional tests for the API.

## Postman Collection

Included in the root of the repository is a Postman collection file named "HS1_REST_Calls.postman_collection.json".  This can be imported into Postman to make sample calls to the local service.
