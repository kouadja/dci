# backend/Dockerfile

FROM node:18

# Dossier de travail dans le conteneur
WORKDIR /app

# Copier les fichiers
COPY package*.json ./
RUN npm install

COPY . .

# Ajoute sequelize-cli globalement si besoin
RUN npm install -g sequelize-cli

# Exposer le port de l'API
EXPOSE 3000

# Lancer automatiquement le serveur après les migrations
CMD ["sh", "-c", "npx sequelize-cli db:create && npx sequelize-cli db:migrate && npm run dev"]
