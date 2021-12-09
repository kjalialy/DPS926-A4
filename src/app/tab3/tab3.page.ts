import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { PopoverController } from '@ionic/angular';
import { MypopComponent } from "../popovers/mypop/mypop.component"
import { MusicService } from '../services/music-service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})

export class Tab3Page {
  searchTerm: string
  results: Observable<any>
  constructor(private httpService: MusicService, private popover: PopoverController) {}
  
  searchForMusic() {
    this.httpService.searchData(this.searchTerm).subscribe(res => this.results = res);
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
