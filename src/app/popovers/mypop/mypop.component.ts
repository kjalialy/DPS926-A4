import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from "@ionic/angular";
import { Router } from '@angular/router';

@Component({
  selector: 'app-mypop',
  templateUrl: './mypop.component.html',
  styleUrls: ['./mypop.component.scss'],
})
export class MypopComponent implements OnInit {
  @Input() albumId: Number
  @Input() artistId: Number
  constructor (
    private popover: PopoverController,
    private router: Router
  ) { }

  ngOnInit() {}

  ClosePopover() {
    this.popover.dismiss();
  }

  navigate(location) {
    if (location == "artist") {
      this.router.navigate([`/artist-detail/${this.artistId}`]);
      this.ClosePopover();
    }
    else {
      this.router.navigate([`/album-detail/${this.albumId}`]);
      this.ClosePopover();
    }
  }

}
