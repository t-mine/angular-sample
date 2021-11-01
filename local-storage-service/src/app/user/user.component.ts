import { Component, OnInit } from '@angular/core';
import { LocalStorageService, IMyItem } from '../local-storage.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  items: IMyItem[] | undefined;
  dataSubs = new Subscription();

  id: string = '';
  name: string = '';
  company: string = '';

  constructor(
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.localStorageService.subject.subscribe((items: IMyItem[]) => {
      this.items = items;
    });
    this.localStorageService.fetch().subscribe((items: IMyItem[]) => {
      this.items = items;
    });
  }

  add(): void {
    if(!this.id) {
      return;
    }
    const item: IMyItem = {
      id: Number(this.id),
      name: this.name,
      companyName: this.company
    };
    console.log(item);

    this.localStorageService.add(item);
  }

  clear(): void {
    this.localStorageService.clear();
  }

  ngOnDestroy() {
    if (this.dataSubs) {
      this.dataSubs.unsubscribe();
    }
  }

}
