# =========================
# Dockerfile pour le front-end React (Vite)
# =========================
FROM node:18

# Créer le dossier de travail dans le conteneur
WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tout le projet
COPY . .

# Exposer le port de Vite
EXPOSE 5173

# Démarrer l'application
CMD ["npm", "run", "dev"]
