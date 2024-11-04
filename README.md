# Application de Gestion de Réservations

Cette application permet aux utilisateurs de gérer les réservations de chambres, les clients, les utilisateurs, et les types de chambres de manière simple et intuitive. Elle inclut des fonctionnalités de connexion et de réinitialisation de mot de passe en cas d'oubli.

## Fonctionnalités

#### Authentification

- **Connexion** : Accès sécurisé pour les utilisateurs afin de gérer les fonctionnalités de l'application.
- **Réinitialisation de mot de passe** : Permet aux utilisateurs de recevoir un lien par email pour réinitialiser leur mot de passe en cas d'oubli.


### Réservations

- **Ajout de réservations** : Ajouter de nouvelles réservations pour les clients.
- **Modification de réservations** : Modifier les réservations existantes.
- **Suppression de réservations** : Supprimer les réservations.
- **Affichage de la liste des réservations** :  Visualiser toutes les réservations existantes avec leur statut et leurs dates.

### Chambres

- **Ajout de chambres** : Ajouter de nouvelles chambres disponibles pour les réservations.
- **Modification de chambres** :  Modifier les informations des chambres.
- **Suppression de chambres** :  Supprimer des chambres.
- **Affichage de la liste des chambres** :  Visualiser toutes les chambres avec leurs informations telles que le numéro, le type et le prix.

### Clients

- **Ajout de clients** : Enregistrer de nouveaux clients dans le système.
- **Modification des clients** :  Mettre à jour les informations des clients.
- **Suppression des clients** :  Supprimer des clients du système.
- **Affichage de la liste des clients** :   Voir tous les clients enregistrés avec leurs coordonnées.

### Types de Chambres

- **Ajout de types de chambres** : Ajouter de nouvelles catégories de chambres (par exemple, suite, standard).
- **Modification des types de chambres** :  Modifier les informations des catégories de chambres.
- **Suppression des types de chambres** :  Supprimer des catégories de chambres.
- **Affichage de la liste des types de chambres** :   Visualiser toutes les catégories de chambres disponibles.


## Prérequis

- Node.js
- Vue.js 3
- Pinia
- Bootstrap

## Installation

Clonez le projet et installez les dépendances :

```bash
git clone https://github.com/AbderahmaneThimbo/Reservation-App.git
```
```bash
cd Reservation-App
```
```bash
npm install
```
## Démarrer le projet

```bash
npm run dev
```

## Utilisation d'Axios

L'application de gestion des réservations utilise Axios pour gérer la communication avec le serveur backend. Elle permet de récupérer, ajouter, modifier et supprimer des réservations, des chambres, des clients et des types de chambres en envoyant des requêtes HTTP.

## Fonctionnalité de Réinitialisation de Mot de Passe

En cas d'oubli de mot de passe, l'utilisateur peut entrer son email pour recevoir un lien de réinitialisation. Ce lien est sécurisé par un jeton unique et temporaire, permettant de définir un nouveau mot de passe.


## Auteur

[Abderahmane Thimbo](https://github.com/AbderahmaneThimbo)

