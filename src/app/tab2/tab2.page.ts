import { Component } from '@angular/core';
import { DatabaseService } from '../services/database-service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  artists: any
  albums: any
  constructor(private dbService: DatabaseService) {
    //this.loadData();
  }

  ngOnInit() {
    this.dbService.dbState().subscribe((res) => {
      if (res) {
        this.dbService.fetchArtists().subscribe(item => {
          this.artists = item;
        })
        this.dbService.fetchAlbums().subscribe(item => {
          this.albums = item;
        })
      }
    })
  }

  /*async loadData() {
    this.artists = await this.dbService.getArtists();
    this.albums = await this.dbService.getAlbums();
  }*/

}
