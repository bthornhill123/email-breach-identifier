const express = require( "express" );
const app = express();
const port = 8080;
const axios = require('axios');

const apiKey = '195be73864154e71b48f0f8ea61e89bc';
const requestUrl = 'https://haveibeenpwned.com/api/v3/breachedaccount';
const userAgent = 'email-breach';

app.use(express.json());

const getEmailBreaches = async (email) => {
    return await axios({
        method: 'get',
        url: `${ requestUrl }/${ email }`,
        // url: 'https://dog.ceo/api/breeds/list/all'
        headers: {
            'hibp-api-key': apiKey,
            'user-agent': userAgent
        },
        // params: {
        //     'truncateResponse': 'false'
        // }
    });
};

app.get( "/breaches", async (req, res ) => {
    const breaches = await getEmailBreaches('bthornhill123@gmail.com');
    console.log('breaches :>> ', breaches);
});

app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );