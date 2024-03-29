const request = require('supertest')
const express = require('express')
const parseCsv = require('../routes/parseCsv');

const app = new express();

app.use('/', parseCsv);

describe('Validate parseCsv endpoints', () => {
    test('responds to /healthcheck', async () => {
        const res = await request(app).get('/healthcheck');
        expect(res.statusCode).toBe(200);
        expect(res.text).toEqual('Healthy')
    })
    
    test('validate csvParameter happy return', async () => {
        const queryString = '?csv=%22Prescott,%20Zeke%22,%22542-51-6641%22,21,%22801-555-2134%22,%22Opratory=2,PCP=1%22'
        const res = await request(app).get('/csvParameter' + queryString)
        expect(res.statusCode).toBe(200);
        expect(res.text).toEqual('[Prescott, Zeke] [542-51-6641] [21] [801-555-2134] [Opratory=2,PCP=1]')
    })

    test('validate parseCsvBody happy return', async () => {
        const bodyString = '"Patient Name","SSN","Age","Phone Number","Status"' + "\n" + 
        '"Prescott, Zeke","542-51-6641",21,"801-555-2134","Opratory=2,PCP=1"'  + '\n' +
        '"Goldstein, Bucky","635-45-1254",42,"435-555-1541","Opratory=1,PCP=1"' + '\n' +
        '"Vox, Bono","414-45-1475",51,"801-555-2100","Opratory=3,PCP=2"';
        const res = await request(app).post('/parseCsvBody')
        .set({'Content-Type' : 'text/plain'})
        .send(bodyString)
        expect(res.statusCode).toBe(200);
        expect(res.text).toEqual('[Patient Name] [SSN] [Age] [Phone Number] [Status]' + '\n' +
        '[Prescott, Zeke] [542-51-6641] [21] [801-555-2134] [Opratory=2,PCP=1]' + '\n' +
        '[Goldstein, Bucky] [635-45-1254] [42] [435-555-1541] [Opratory=1,PCP=1]' + '\n' +
        '[Vox, Bono] [414-45-1475] [51] [801-555-2100] [Opratory=3,PCP=2]')
    })

    test('validate parseCsvBody returns single line from single input', async () => {
        const bodyString = '"Patient Name","SSN","Age","Phone Number","Status"';
        const res = await request(app).post('/parseCsvBody')
        .set({'Content-Type' : 'text/plain'})
        .send(bodyString)
        expect(res.statusCode).toBe(200);
        expect(res.text).toEqual('[Patient Name] [SSN] [Age] [Phone Number] [Status]')
    })

    test('validate csvParameter checks for string in query', async () => {
        const queryArray = '?[]'
        const res = await request(app).get('/csvParameter' + queryArray)
        expect(res.statusCode).toBe(400);
        expect(res.text).toEqual('Invalid data type, please provide string in query paramters')
    })

    test('validate csvParameter checks for string in query when passed in object', async () => {
        const queryObject = '?{}'
        const res = await request(app).get('/csvParameter' + queryObject)
        expect(res.statusCode).toBe(400);
        expect(res.text).toEqual('Invalid data type, please provide string in query paramters')
    })

    test('validate parseCsvBody returns 400 and error message when sent JSON request', async () => {
        const bodyString = {};
        const res = await request(app).post('/parseCsvBody')
        .set({'Content-Type' : 'application/json'})
        .send(bodyString)
        expect(res.statusCode).toBe(400);
        expect(res.text).toEqual('Invalid data type. Body must contain text input')
    })

    test('validate parseCsvBody returns 400 and error message when sent HTML request', async () => {
        const bodyString = '';
        const res = await request(app).post('/parseCsvBody')
        .set({'Content-Type' : 'text/html'})
        .send(bodyString)
        expect(res.statusCode).toBe(400);
        expect(res.text).toEqual('Invalid data type. Body must contain text input')
    })

    test('validate parseCsvBody returns 400 and error message when sent XML request', async () => {
        const bodyString = '';
        const res = await request(app).post('/parseCsvBody')
        .set({'Content-Type' : 'application/xml'})
        .send(bodyString)
        expect(res.statusCode).toBe(400);
        expect(res.text).toEqual('Invalid data type. Body must contain text input')
    })

})