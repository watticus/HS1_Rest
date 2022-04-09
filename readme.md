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
```
[Patient Name] [SSN] [Age] [Phone Number] [Status]
[Prescott, Zeke] [542-51-6641] [21] [801-555-2134] [Opratory=2,PCP=1]
[Goldstein, Bucky] [635-45-1254] [42] [435-555-1541] [Opratory=1,PCP=1]
[Vox, Bono] [414-45-1475] [51] [801-555-2100] [Opratory=3,PCP=2]
```