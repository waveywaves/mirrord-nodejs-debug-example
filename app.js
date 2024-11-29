const express = require('express');
const redis = require('redis');

const app = express();
const client = redis.createClient({ url: 'redis://redis:6379' });

client.connect();

app.get('/', async (req, res) => {
    try {
        let visits = await client.get('visits');
        visits = visits ? parseInt(visits) + 1 : 1;
        await client.set('visits', visits);
        res.send(`
            <html>
                <head><title>Node.js + Redis</title></head>
                <body>
                    <h1>Welcome to Node.js + Redis App!</h1>
                    <p>Number of visits: ${visits}</p>
                </body>
            </html>
        `);
    } catch (err) {
        res.status(500).send('Error connecting to Redis');
    }
});

app.listen(3000, () => console.log('Node.js server running on port 3000'));