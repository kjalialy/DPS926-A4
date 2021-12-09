import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Platform, ToastController } from '@ionic/angular';
import { MusicService } from '../services/music-service';
import { DatabaseService } from '../services/database-service';

@Component({
  selector: 'app-artist-detail',
  templateUrl: './artist-detail.page.html',
  styleUrls: ['./artist-detail.page.scss'],
})
export class ArtistDetailPage implements OnInit {
  artistInfo: any
  artistTopHits: any
  artistAlbums: any
  artistRelatedArtists: any
  isFavourite: Boolean = false
  heartClass: string ="heart-outline"
  artists: any
  constructor(private platform: Platform, private dbService: DatabaseService, private httpService: MusicService, private route: ActivatedRoute, public toastController: ToastController) {
   }

  async ngOnInit() {
    this.dbService.dbState().subscribe((res) => {
      if (res) {
        this.dbService.fetchArtists().subscribe(item => {
          this.artists = item;
        })
      }
    })
    const id = this.route.snapshot.params['id'];
    this.httpService.getArtist(id).subscribe(res => this.artistInfo = res);
    this.httpService.getArtistTopTracks(id).subscribe(res => this.artistTopHits = res);
    this.httpService.getArtistDiscography(id).subscribe(res => this.artistAlbums = res);
    this.httpService.getArtistRelated(id).subscribe(res => this.artistRelatedArtists = res);

    this.loadData(id);
  }

  async loadData(id) {
    console.log("YO: " + id);
    this.dbService.getArtist(Number(id)).then(res => {
      if (res) {
        console.log(res);
        this.isFavourite = true;
        this.heartClass = "heart";
      }
    })
    /*
    for (let i of await this.dbService.getArtists()) {
      if (Number(i.artistID) == Number(id)) {
        this.isFavourite = true;
        this.heartClass = "heart";
      }
    }*/


    //this.artists = await this.dbService.getArtists();
  }

  formatDate(date) {
    return new Date(date).getFullYear();
  }

  async changeView() {
    const newArtist = {
      artistID: this.route.snapshot.params['id'],
      artistName: this.artistInfo.name,
      artistCover: this.artistInfo.picture_xl
    }

    if (this.isFavourite) {
      /*
      this.dbService.deleteArtist(Number(newArtist.artistID)).then(async item => {
        await this.presentToast(`${newArtist.artistName} has been removed from your favourites`);
      })*/

      this.dbService.deleteArtist(newArtist.artistID).then(async(res) => {
        await this.presentToast(`${newArtist.artistName} has been removed from your favourites`);
      })
      //this.artists = await this.dbService.getArtists();
      this.isFavourite = false;
      this.heartClass = "heart-outline";
    }
    else {
      this.dbService.addArtist(Number(newArtist.artistID), newArtist.artistName, newArtist.artistCover).then(async(res) => {
        await this.presentToast(`${newArtist.artistName} has been added to your favourites`);
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
