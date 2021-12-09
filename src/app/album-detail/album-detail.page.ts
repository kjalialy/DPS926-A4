import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Platform, ToastController } from '@ionic/angular';

import { MusicService } from '../services/music-service';
import { DatabaseService } from '../services/database-service';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-album-detail',
  templateUrl: './album-detail.page.html',
  styleUrls: ['./album-detail.page.scss'],
})
export class AlbumDetailPage implements OnInit {
  albumInfo: any
  isFavourite: Boolean = false
  heartClass: string ="heart-outline"
  albums: any
  constructor(public toastController: ToastController, private dbService: DatabaseService, private httpService: MusicService, private route: ActivatedRoute, protected _sanitizer: DomSanitizer) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.dbService.dbState().subscribe((res) => {
      if (res) {
        this.dbService.fetchAlbums().subscribe(item => {
          this.albums = item;
        })
      }
    })
    this.httpService.getAlbum(id).subscribe(res => this.albumInfo = res);
    this.loadData(id);
  }

  async loadData(id) {
    this.dbService.getAlbum(Number(id)).then(res => {
      if (res) {
        this.isFavourite = true;
        this.heartClass = "heart";
      }
    })
  }

  formatDate(date) {
    return new Date(date).getFullYear();
  }

  formatTime(time) {
    return Math.floor(time / 60) + ":" + (time % 60 ? time % 60 : '00');
  }

  listContributors() {
    let completeString = '';
    
    if (!this.albumInfo.error) {
      let item = this.albumInfo.contributors;
      for (let i = 0; i < item.length; i++) {
        if (i < item.length - 1) {
          completeString += item[i].name + " · ";
        }
        else {
          completeString += item[i].name;
        }
      }
  
      return completeString;
    }
    return;
  }

  async changeView() {
    const newAlbum = {
      albumID: this.route.snapshot.params['id'],
      albumName: this.albumInfo.title,
      albumReleaseDate: this.albumInfo.release_date,
      albumCover: this.albumInfo.cover_xl
    }

    if (this.isFavourite) {
      this.dbService.deleteAlbum(newAlbum.albumID).then(async(res) => {
        await this.presentToast(`${newAlbum.albumName} has been removed from your favourites`);
      })
      //this.artists = await this.dbService.getArtists();
      this.isFavourite = false;
      this.heartClass = "heart-outline";
    }
    else {
      this.dbService.addAlbum(Number(newAlbum.albumID), newAlbum.albumName, newAlbum.albumReleaseDate, newAlbum.albumCover).then(async(res) => {
        await this.presentToast(`${newAlbum.albumName} has been added to your favourites`);
      })
      this.heartClass = "heart";
      this.isFavourite = true;
    }

  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }
}
