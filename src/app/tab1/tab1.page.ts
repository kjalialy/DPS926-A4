import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { MusicService } from '../services/music-service';
import { PopoverController } from '@ionic/angular';
import { MypopComponent } from "../popovers/mypop/mypop.component"
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  topTracks: Observable<any>
  topArists: Observable<any>
  topAlbums: Observable<any>
  constructor(private httpService: MusicService, private router: Router, private popover: PopoverController) {}

  ngOnInit() {
    this.httpService.getTrackCharts().subscribe(res => this.topTracks = res['data']);
    this.httpService.getArtistCharts().subscribe(res => this.topArists = res['data']);
    this.httpService.getAlbumCharts().subscribe(res => this.topAlbums = res['data']);
  }

  async displayOptions(item, ev: any) {
    const pop = await this.popover.create({
      component: MypopComponent,
      event: ev,
      translucent: true,
      backdropDismiss: true,
      componentProps: {albumId: item.album.id, artistId: item.artist.id}
    });
    return await pop.present();
  }
}
