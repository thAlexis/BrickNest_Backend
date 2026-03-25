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
Lancez le script src/db/legoSets.sql;

🏃‍♂️ Démarrage
Une fois l'installation et la configuration terminées, vous pouvez lancer le serveur.

nodemon .

Le serveur sera accessible à l'adresse : http://localhost:3000

## 🌍 Déploiement en Production (Vercel Serverless)

Cette API est conçue pour être déployée sur **Vercel** en tant que fonction Serverless.

### ⚠️ Prérequis Base de Données

Vercel étant un environnement cloud, il ne peut pas accéder à une base de données locale (`localhost`).
La base de données MySQL doit être hébergée sur un service cloud accessible publiquement (ex: **Aiven**, **PlanetScale**, **Railway** ou **Supabase**).

### 1. Configuration Serverless (`vercel.json`)

Un fichier de configuration `vercel.json` est requis à la racine pour rediriger le trafic HTTP vers l'application Express :

```json
{
  "version": 2,
  "builds": [
    {
      "src": "index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "index.js"
    }
  ]
}
```

**🛠️ Stack Technique**
*   Runtime : Node.js
*   Framework : Express.js
*   Base de données : MySQL
*   Authentification : JSON Web Token (JWT)

### 2. Procédure de Déploiement (Vercel)

1.  **Pousser le code sur GitHub** :
    *   Assurez-vous que votre projet est hébergé sur un dépôt GitHub (Public ou Privé).

2.  **Importer dans Vercel** :
    *   Connectez-vous à [Vercel](https://vercel.com).
    *   Cliquez sur **Add New... > Project**.
    *   Sélectionnez votre dépôt `BrickNest_Backend` et cliquez sur **Import**.

3.  **Configurer les Variables d'Environnement** :
    *   ⚠️ **Crucial** : Dans l'écran "Configure Project", déroulez la section **Environment Variables**.
    *   Ajoutez toutes les variables définies dans votre `.env` local, mais avec les **valeurs de production** (votre base de données cloud) :
        *   `DB_HOST` : (Ex: `aws.connect.psdb.cloud`)
        *   `DB_USER` : (Votre utilisateur de prod)
        *   `DB_PASSWORD` : (Votre mot de passe de prod)
        *   `DB_NAME` : (Nom de la base de prod)
        *   `JWT_SECRET` : (Générez une clé forte pour la prod)
        *   `JWT_EXPIRES` : `24h`
    *   *Note : Ne définissez PAS la variable `PORT`, Vercel s'en charge.*

4.  **Lancer le Déploiement** :
    *   Cliquez sur **Deploy**.
    *   Une fois terminé, votre API sera accessible via le lien fourni (ex: `https://bricknest-backend.vercel.app`).
