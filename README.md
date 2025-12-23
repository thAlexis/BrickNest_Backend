BrickNest - Backend API

Bienvenue sur le dépôt Backend du projet BrickNest. Cette API REST est construite avec Node.js et Express, et utilise une base de données MySQL.

📋 Prérequis
Avant de commencer, assurez-vous d'avoir installé les outils suivants sur votre machine :

Node.js (v16 ou supérieur recommandé)

npm (généralement inclus avec Node.js)

MySQL Server (doit être installé et en cours d'exécution localement)

🚀 Installation
Cloner le dépôt :

git clone https://github.com/thAlexis/BrickNest_Backend.git
cd bricknest_backend

Installer les dépendances :

npm install

⚙️ Configuration
Le projet nécessite des variables d'environnement pour fonctionner.

Créez un fichier .env à la racine du projet.

Ajoutez-y les variables suivantes :

# Configuration du Serveur

PORT=3000

# Configuration de la Base de Données MySQL

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=votre_mot_de_passe_mysql
DB_NAME=bricknest_db

# Sécurité (JWT)

JWT_SECRET=votre_cle_secrete_ici
JWT_EXPIRES=24h
💡 Astuce pour le JWT_SECRET : Vous pouvez générer une clé sécurisée aléatoire directement dans votre terminal avec la commande suivante :

openssl rand -base64 32
Copiez le résultat et collez-le dans votre fichier .env.

🗄️ Base de Données
Avant de lancer le serveur, vous devez préparer la base de données MySQL :

Assurez-vous que votre serveur MySQL est lancé.

Connectez-vous à MySQL et créez la base de données correspondant à la variable DB_NAME
Lancez le script legoSets.sql;

🏃‍♂️ Démarrage
Une fois l'installation et la configuration terminées, vous pouvez lancer le serveur.

nodemon .

Le serveur sera accessible à l'adresse : http://localhost:3000

🛠️ Stack Technique
Runtime : Node.js

Framework : Express.js

Base de données : MySQL

Authentification : JSON Web Token (JWT)
