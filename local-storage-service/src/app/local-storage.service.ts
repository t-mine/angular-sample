import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

const MY_STORAGE_KEY = 'my_storage_key';

export interface IMyItem {
  id: number;
  name: string;
  companyName: string;
}

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  public items: IMyItem[] | undefined;
  public subject = new Subject<IMyItem[]>();

  constructor() {
  }

  // データの取り出し
  _fetch(): IMyItem[] {
    return JSON.parse(localStorage.getItem(MY_STORAGE_KEY)?? '[]');
  }
  fetch(): Subject<IMyItem[]> {
    this.items = this._fetch();

    this.subject.next(this.items);
    console.log('fetch');
    return this.subject;
  }

  // 全削除
  clear(): LocalStorageService {
    localStorage.removeItem(MY_STORAGE_KEY);

    this.items = this._fetch();
    this.subject.next(this.items);
    return this;
  }

  // 保存
  add(myItem: IMyItem): LocalStorageService {
    const filteredItems = this._fetch().filter((_item) => {
      return _item.id !== myItem.id;
    });
    const items = filteredItems.concat(myItem);
    localStorage.setItem(MY_STORAGE_KEY, JSON.stringify(items));

    this.items = this._fetch();
    this.subject.next(this.items);
    return this;
  }

  // 1件削除
  delete(myItem: IMyItem): LocalStorageService {
    const items = this._fetch();
    const filteredItems = items.filter((_item) => {
      return _item.id !== myItem.id;
    });
    localStorage.setItem(MY_STORAGE_KEY, JSON.stringify(filteredItems));
    
    this.items = this._fetch();
    this.subject.next(this.items);
    return this;
  }
}
