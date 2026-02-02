require('dotenv').config();
const express = require('express');
const cors = require('cors');
const blogRoutes = require('./routes/blog');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/blogs', blogRoutes);

app.get('/', (req, res) => {
    res.send('Multilingual Blog API is running');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
