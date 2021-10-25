import axios from 'axios';
import express, { json } from 'express';
import { SecurityBreach } from './models/securityBreach';
const app = express();
const cors = require('cors');

app.use(json());
app.use(cors({
    origin: '*'
}));

const getEmailBreaches = async (email: string) => {
    const apiKey = '195be73864154e71b48f0f8ea61e89bc';
    const requestUrl = 'https://haveibeenpwned.com/api/v3/breachedaccount';
    const userAgent = 'email-breach';

    const response = await axios({
        method: 'get',
        url: `${ requestUrl }/${ email }`,
        headers: {
            'hibp-api-key': apiKey,
            'user-agent': userAgent
        },
        params: {
            'truncateResponse': 'false'
        }
    });

    const mappedData :SecurityBreach[] = (response.data as any[])
        .map(breach => {
            return { 
                name: breach.Name,
                domain: breach.Domain,
                description: breach.Description,
                date: breach.BreachDate,
                logo: breach.LogoPath
            }
        });

    return mappedData;
};

app.get( "/breaches", async (req, res) => {
    if (typeof req.query.email === "string") {
        const breaches = await getEmailBreaches(req.query.email)
        res.status(200).send(breaches);
    } else {
        res.status(400).send('No email provided.');
    }
});

const port = 8080;
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );