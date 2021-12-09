CREATE TABLE IF NOT EXISTS albumTable(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    albumID INTEGER,
    albumName TEXT,
    albumReleaseDate TEXT,
    albumCover TEXT
);

INSERT or IGNORE INTO albumTable(id, albumID, albumName, albumReleaseDate, albumCover) VALUES (1, 256312232, 'Certified Lover Boy', '2021-09-03', 'https://e-cdns-images.dzcdn.net/images/cover/ea8f80f2edb20885ac8aed8751716794/1000x1000-000000-80-0-0.jpg');