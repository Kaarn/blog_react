// import express from 'express';
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();

app.use(cors({origin: '*'}))

const db = new sqlite3.Database('blog.db');

// Création de la BDD
db.serialize(() => {
    // Création de l'utilisateur en BDD
    db.run(`
        CREATE TABLE IF NOT EXISTS user (
            id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            nom VARCHAR(50) NOT NULL,
            prenom VARCHAR(50) NOT NULL,
            pwd VARCHAR(100) NOT NULL,
            creation_date DATE NOT NULL,
            date_update DATE,
            del_date DATE)`);

    db.run(`
        CREATE TABLE IF NOT EXISTS category (
            id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
            name VARCHAR(100) NOT NULL UNIQUE)`);

    db.run(`
    CREATE TABLE IF NOT EXISTS article (
        id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        titre VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        img VARCHAR(255),
        creation_date DATE NOT NULL,
        date_update DATE,
        del_date DATE,
        id_cat INTEGER,
        id_user INTEGER,
        FOREIGN KEY ("id_cat") REFERENCES "category" ("id")
        FOREIGN KEY ("id_user") REFERENCES "user" ("id"))`);
    
    // Insertion en BDD
    db.serialize(() => {
        /*db.run(`
            INSERT INTO category (name) VALUES ('High-Tech'), ('Android'), ('iPhone')`)*/
       /* db.run(`
            INSERT INTO user (email, nom, prenom, pwd, creation_date)
            VALUES
                ('lyse.boj@gmail.com', 'Bojanek', 'Lyse', 'lyselyse', DATE()),
                ('sabriner@virginia.com', 'Virginia', 'Sabriner', 'howdy', DATE())`);*/
        /*db.run(`
            INSERT INTO article (titre, content, creation_date, id_cat, id_user, slug)
            VALUES
            ("WhatsApp : Il sera bientôt possible de réagir aux messages avec un pet", "Une nouvelle option révolutionnaire, vous pouvez même sentir le pet à travers votre iPhone pour ce nouveau iSmell",
            DATE(), 1, 1, 
            'whatsapp-nouvelle-fonctionnalite'),
            ("iSmell : Le nouveau gadget d'Apple",
            "Ce gadget se plug sur votre iPhone et rejète une substance contenant l'odeur reçue",
            DATE(), 2, 1, 'iSmell-nouvelle-revolution-high-tech')`);*/

    });
});






app.get('/', (req, res) => {
    const query = `SELECT a.id, a.titre, a.slug, a.content, a.img, a.creation_date, c.name as cat, u.nom, u.prenom, u.email FROM article as a
    JOIN category as c ON a.id_cat = c.id
    JOIN user as u ON a.id_user = u.id`;
    db.all(query, (error, row) => {
        res.status(200).json(row);
    }); 
});


app.listen(8080, (error) => {
    if (error) {
        db.close();
    }
    console.log("Serveur à l'écoute");
});