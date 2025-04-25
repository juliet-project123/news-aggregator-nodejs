const express = require('express');
const axios = require('axios');
const app = express();

const NEWS_API_KEY = '6b151c29e9abe431ab74e11e14413ae7'; // 🔑 Replace with your real API key

app.get('/', async (req, res) => {
  const { country = 'in', category = 'technology' } = req.query;

  const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${NEWS_API_KEY}`;

  try {
    const response = await axios.get(url);
    const articles = response.data.articles.slice(0, 5);

    let html = '<h1>Latest News</h1><ul>';
    articles.forEach(article => {
      html += <li><a href="${article.url}" target="_blank">${article.title}</a><p>${article.description}</p></li>;
    });
    html += '</ul>';
    res.send(html);
  } catch (error) {
    res.send('Error fetching news');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(Server running on http://localhost:${PORT});
});
