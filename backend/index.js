const express = require('express');
const app = express();
const port = 3000;
require('dotenv').config();
const cors =  require('cors')
const projetRoutes = require('./src/Routes/projet.route');

app.use(cors({
  origin: 'http://localhost:5173', // en env
  credentials: true               
}));
app.use(cors());


app.use(express.json());

// Middleware pour parser le JSON
app.use(express.json());





app.use('/api', projetRoutes);


// Route GET de test
app.get('/', (req, res) => {
  res.send('Bienvenue sur mon app Node.js avec Express !');
});
/* console.log(process.env.PORT); */

// Lancer le serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
