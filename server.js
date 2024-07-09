const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = 3000;

// Configurar o middleware para servir arquivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Rota para buscar as notícias
app.get('/api/news', async (req, res) => {
  let data = JSON.stringify({
    "q": "novo modelo de IA",
    "location": "Brazil",
    "gl": "br",
    "hl": "pt-br",
    "num": 20
  });

  let config = {
    method: 'post',
    url: 'https://google.serper.dev/search',
    headers: { 
      'X-API-KEY': 'Gf8884d4688bf7f8b100f5e73d96ae18ce8224e42', 
      'Content-Type': 'application/json'
    },
    data : data
  };

  try {
    const response = await axios(config);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao buscar as notícias');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
