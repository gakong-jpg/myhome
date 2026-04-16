const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const GUESTBOOK_FILE = path.join(__dirname, 'guestbook.json');

app.use(cors());
app.use(express.json());

// Helper to read guestbook file
const readGuestbook = () => {
    if (!fs.existsSync(GUESTBOOK_FILE)) {
        fs.writeFileSync(GUESTBOOK_FILE, JSON.stringify([]));
    }
    const data = fs.readFileSync(GUESTBOOK_FILE, 'utf8');
    try {
        return JSON.parse(data);
    } catch(e) {
        return [];
    }
};

// Helper to write guestbook file
const writeGuestbook = (data) => {
    fs.writeFileSync(GUESTBOOK_FILE, JSON.stringify(data, null, 2));
};

// GET /api/guestbook - Get all messages
app.get('/api/guestbook', (req, res) => {
    const messages = readGuestbook();
    // Sort so newest is first
    messages.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    res.json(messages);
});

// POST /api/guestbook - Add a new message
app.post('/api/guestbook', (req, res) => {
    const { name, email, message } = req.body;
    if (!name || !message) {
        return res.status(400).json({ error: 'Name and message are required' });
    }

    const newMessage = {
        id: Date.now().toString(),
        name,
        email: email || 'No email provided',
        message,
        timestamp: new Date().toISOString()
    };

    const messages = readGuestbook();
    messages.push(newMessage);
    writeGuestbook(messages);

    res.status(201).json(newMessage);
});

// POST /api/contact - Simulate sending an email
app.post('/api/contact', (req, res) => {
    const { message } = req.body;
    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    // Simulate delay
    setTimeout(() => {
        console.log(`\n[EMAIL SIMULATION]`);
        console.log(`To: gakong@dongyang.ac.kr`);
        console.log(`From: Chatbot Contact`);
        console.log(`Content: ${message}`);
        console.log(`--------------------\n`);

        res.json({ success: true, message: '문의가 접수되었습니다.' });
    }, 1000);
});

// Serve frontend static files if we want to run them together
app.use(express.static(path.join(__dirname)));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
