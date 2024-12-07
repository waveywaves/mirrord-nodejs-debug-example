const express = require('express');
const redis = require('redis');
const bodyParser = require('body-parser');

const app = express();
const redisUrl = process.env.REDIS_URL || 'redis://redis:6379';
const client = redis.createClient({ url: redisUrl });

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

client.connect();

// Function to get all messages
async function getMessages() {
    const messages = await client.lRange('messages', 0, -1);
    return messages.map(msg => JSON.parse(msg));
}

app.get('/', async (req, res) => {
    try {
        const messages = await client.lRange('messages', 0, -1);
        const parsedMessages = messages.map(msg => JSON.parse(msg));
        
        res.send(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Guestbook</title>
                <style>
                    .logo {
                        text-align: center;
                        margin: 20px 0;
                    }
                    .logo img {
                        width: 150px;
                    }
                    body { 
                        font-family: Arial, sans-serif; 
                        max-width: 800px; 
                        margin: 0 auto; 
                        padding: 20px; 
                    }
                    .message { 
                        border: 1px solid #ddd; 
                        margin: 10px 0; 
                        padding: 10px; 
                    }
                    form { 
                        margin: 20px 0; 
                    }
                    input, textarea { 
                        margin: 5px 0; 
                        padding: 5px; 
                        width: 100%; 
                    }
                    button { 
                        padding: 10px; 
                        background: #007bff; 
                        color: white; 
                        border: none; 
                        cursor: pointer; 
                    }
                </style>
            </head>
            <body>
                <div class="logo">
                    <img src="images/mirrord.svg" alt="mirrord logo" />
                </div>
                <h1>Welcome to mirrord Guestbook</h1>
                
                <form method="POST" action="/sign">
                    <div>
                        <input type="text" name="name" placeholder="Your Name" required>
                    </div>
                    <div>
                        <textarea name="message" placeholder="Your Message" required></textarea>
                    </div>
                    <button type="submit">Sign Guestbook</button>
                </form>

                <h2>Messages:</h2>
                ${parsedMessages.map(msg => `
                    <div class="message">
                        <strong>${msg.name}</strong> - ${new Date(msg.timestamp).toLocaleString()}
                        <p>${msg.message}</p>
                    </div>
                `).join('')}
            </body>
            </html>
        `);
    } catch (err) {
        console.error('Error fetching messages:', err);
        res.status(500).send('Error fetching messages');
    }
});

app.post('/sign', async (req, res) => {
    try {
        const { name, message } = req.body;
        const entry = {
            name,
            message,
            timestamp: Date.now()
        };
        
        await client.lPush('messages', JSON.stringify(entry));
        res.redirect('/');
    } catch (err) {
        res.status(500).send('Error saving message');
    }
});

app.use('/images', express.static('images'));

app.listen(3000, () => console.log('Guestbook app running on port 3000'));