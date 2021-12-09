import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Album } from './album';
import { Artist } from './artist';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
    providedIn: 'root'
  })

export class DatabaseService {
    private storage: SQLiteObject;
    albumList = new BehaviorSubject([]);
    artistList = new BehaviorSubject([]);

    private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

    constructor (
        private platform: Platform, 
        private sqlite: SQLite, 
        private httpClient: HttpClient,
        private sqlPorter: SQLitePorter,
    ) {
        this.platform.ready().then(() => {
            this.sqlite.create({
                name: 'positronx_db.db',
                location: 'default'
            })
            .then((db: SQLiteObject) => {
                this.storage = db;
                this.getFakeData();
                this.getFakeData2()
            })
        })
    }

    dbState() {
        return this.isDbReady.asObservable();
    }

    fetchAlbums(): Observable<Album[]> {
        return this.albumList.asObservable();
    }

    fetchArtists(): Observable<Artist[]> {
        return this.artistList.asObservable();
    }

    getFakeData() {
        this.httpClient.get(
            'assets/dump.sql', 
            {responseType: 'text'}
          ).subscribe(data => {
            this.sqlPorter.importSqlToDb(this.storage, data)
              .then(_ => {
                this.getArtists();
                this.isDbReady.next(true);
              })
              .catch(error => console.error(error));
          });
    }

    getFakeData2() {
        this.httpClient.get(
            'assets/dump2.sql', 
            {responseType: 'text'}
          ).subscribe(data => {
            this.sqlPorter.importSqlToDb(this.storage, data)
              .then(_ => {
                this.getAlbums();
                this.isDbReady.next(true);
              })
              .catch(error => console.error(error));
          });
    }

    getAlbums(){
        return this.storage.executeSql('SELECT * FROM albumTable', []).then(res => {
          let items: Album[] = [];
          if (res.rows.length > 0) {
            for (var i = 0; i < res.rows.length; i++) { 
              items.push({ 
                albumID: res.rows.item(i).albumID,
                albumName: res.rows.item(i).albumName,  
                albumReleaseDate: res.rows.item(i).albumReleaseDate,
                albumCover: res.rows.item(i).albumCover,
               });
            }
          }
          this.albumList.next(items);
        });
    }

    getArtists(){
        return this.storage.executeSql('SELECT * FROM artistTable', []).then(res => {
          let items: Artist[] = [];
          if (res.rows.length > 0) {
            for (var i = 0; i < res.rows.length; i++) { 
              items.push({ 
                artistID: res.rows.item(i).artistID,
                artistName: res.rows.item(i).artistName,  
                artistCover: res.rows.item(i).artistCover,
               });
            }
          }
          this.artistList.next(items);
        });
    }

    addAlbum(id, name, releaseDate, cover) {
        let data = [id, name, releaseDate, cover];
        return this.storage.executeSql('INSERT INTO albumTable (albumID, albumName, albumReleaseDate, albumCover) VALUES (?, ?, ?, ?)', data)
        .then(res => {
        this.getAlbums();
        });
    }

    addArtist(id, name, cover) {
        let data = [id, name, cover];
        return this.storage.executeSql('INSERT INTO artistTable (artistID, artistName, artistCover) VALUES (?, ?, ?)', data)
        .then(res => {
        this.getArtists();
        });
    }

    // Get single object
    getArtist(id): Promise<Artist> {
        return this.storage.executeSql('SELECT * FROM artistTable WHERE artistID = ?', [id]).then(res => { 
        return {
            artistID: res.rows.item(0).artistID,
            artistName: res.rows.item(0).artistName,  
            artistCover: res.rows.item(0).artistCover,
        }
        });
    }
    
    // Get single object
    getAlbum(id): Promise<Album> {
        return this.storage.executeSql('SELECT * FROM albumTable WHERE albumID = ?', [id]).then(res => { 
        return {
            albumID: res.rows.item(0).albumID,
            albumName: res.rows.item(0).albumName,  
            albumReleaseDate: res.rows.item(0).albumReleaseDate,
            albumCover: res.rows.item(0).albumCover,
        }
        });
    } 

    // Delete
    deleteArtist(id) {
        return this.storage.executeSql('DELETE FROM artistTable WHERE artistID = ?', [id])
        .then(_ => {
        this.getArtists();
        });
    } 

    deleteAlbum(id) {
        return this.storage.executeSql('DELETE FROM albumTable WHERE albumID = ?', [id])
        .then(_ => {
        this.getAlbums();
        });
    } 

}