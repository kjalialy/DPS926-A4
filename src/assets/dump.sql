CREATE TABLE IF NOT EXISTS artistTable(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    artistID INTEGER,
    artistName TEXT, 
    artistCover TEXT
);

INSERT or IGNORE INTO artistTable(id, artistID, artistName, artistCover) VALUES (1, 288166, 'Justin Bieber', 'https://e-cdns-images.dzcdn.net/images/artist/22dd86b628a03d8dad3c7dfb33320a91/1000x1000-000000-80-0-0.jpg');