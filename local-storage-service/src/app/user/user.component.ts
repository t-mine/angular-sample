import { Component, OnInit } from '@angular/core';
import { LocalStorageService, IMyItem } from '../local-storage.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  private items: IMyItem[] | undefined;

  constructor(
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.items = this.localStorageService.fetch();
  }

}
