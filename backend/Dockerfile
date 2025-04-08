# =========================
# Dockerfile pour le back-end Node.js
# =========================
FROM node:18

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tout le code source
COPY . .

# Exposer le port utilisé par l'application
EXPOSE 3000

# Lancer l'application
CMD ["npm", "run","dev"]


