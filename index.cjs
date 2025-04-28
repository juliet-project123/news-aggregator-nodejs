const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors()); 

const NEWS_API_KEY = 'c3e95c06a89041e2a32007f6507ec8d5'; 

app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/news', async (req, res) => {
    const { country = 'us', category = 'general' } = req.query;
    
    // Ensure the country code is lowercase
    const countryCode = country.toLowerCase();

    const url = `https://newsapi.org/v2/top-headlines?country=${countryCode}&category=${category}&apiKey=${NEWS_API_KEY}`;

    try {
        const response = await axios.get(url);
        console.log(response.data);  // Log the full response

        if (!response.data || !Array.isArray(response.data.articles) || response.data.articles.length === 0) {
            return res.status(404).json({
                error: `No articles found for country: ${country}, category: ${category}`
            });
        }

        const articles = response.data.articles.map(article => ({
            title: article.title,
            description: article.description,
            url: article.url
        }));

        res.json({ country, category, articles });
    } catch (error) {
        console.error(error);  // Log the error for debugging
        res.status(500).json({ error: 'Error fetching news' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
