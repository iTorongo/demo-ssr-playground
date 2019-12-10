import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { ItemService } from '../shared/item.service';
import { Item } from '../shared/item';
import { Observable } from 'rxjs';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  items$: Observable<Item[]>;
  platform: string;

  constructor(private is: ItemService, @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit() {
    this.items$ = this.is.getAll();

    if (isPlatformBrowser(this.platformId)) {
      this.platform = '💻 browser';
    } else if (isPlatformServer(this.platformId)) {
      this.platform = '⚙️ server';
    } else {
      this.platform = 'unknown';
    }
  }

}
