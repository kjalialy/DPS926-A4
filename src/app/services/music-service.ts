import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'
import { HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class MusicService {
    url = 'https://cors-anywhere.herokuapp.com/https://api.deezer.com';
    headers: HttpHeaders
    constructor(private http: HttpClient) {
        this.headers = new HttpHeaders();
        this.headers.append('Access-Control-Allow-Origin', 'http://localhost:8100');
        this.headers.append('Access-Control-Allow-Credentials', 'true');
    }

    searchData(title:string) {
        var fullUrl = `${this.url}/search?q=${encodeURI(title)}`;
        return this.http.get(fullUrl, { 'headers': this.headers}).pipe(map(data => data['data']));
    }

    getTrackCharts() {
        var fullUrl = `${this.url}/chart`;
        return this.http.get(fullUrl, { 'headers': this.headers}).pipe(map(data => data['tracks']));
    }

    getArtistCharts() {
        var fullUrl = `${this.url}/chart`;
        return this.http.get(fullUrl, { 'headers': this.headers}).pipe(map(data => data['artists']));
    }

    getAlbumCharts() {
        var fullUrl = `${this.url}/chart`;
        return this.http.get(fullUrl, { 'headers': this.headers}).pipe(map(data => data['albums']));
    }

    getArtist(id) {
        var fullUrl = `${this.url}/artist/${id}`;
        return this.http.get(fullUrl, { 'headers': this.headers});
    }

    getArtistTopTracks(id) {
        var fullUrl = `${this.url}/artist/${id}/top`;
        return this.http.get(fullUrl, { 'headers': this.headers}).pipe(map(data => data['data']));
    }

    getArtistDiscography(id) {
        var fullUrl = `${this.url}/artist/${id}/albums`;
        return this.http.get(fullUrl, { 'headers': this.headers}).pipe(map(data => data['data']));
    }

    getArtistRelated(id) {
        var fullUrl = `${this.url}/artist/${id}/related`;
        return this.http.get(fullUrl, { 'headers': this.headers}).pipe(map(data => data['data']));
    }

    getAlbum(id) {
        var fullUrl = `${this.url}/album/${id}`;
        return this.http.get(fullUrl, { 'headers': this.headers});
    }
}