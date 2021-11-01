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

  constructor(
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {

    this.localStorageService.subject.subscribe((items: IMyItem[]) => {
      console.log(items);
      this.items = items;
    });

    const item1: IMyItem = {
      id: 1,
      name: '田中太郎',
      companyName: 'A社'
    };
    const item2: IMyItem = {
      id: 2,
      name: '佐藤太郎',
      companyName: 'C社'
    };
    this.localStorageService.add(item1).add(item2);

    const item3: IMyItem = {
      id: 3,
      name: '佐藤太郎',
      companyName: 'F社'
    };

    this.localStorageService.add(item3);
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
