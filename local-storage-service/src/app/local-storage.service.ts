import { Injectable } from '@angular/core';

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
  constructor() { }

  // データの取り出し
  fetch(): IMyItem[] {
    return JSON.parse(localStorage.getItem(MY_STORAGE_KEY)?? '[]');
  }

  // 全削除
  clear(): void {
      localStorage.removeItem(MY_STORAGE_KEY);
  }

  // 保存
  add(myItem: IMyItem): void {
      const items = this.fetch().concat(myItem);
      localStorage.setItem(MY_STORAGE_KEY, JSON.stringify(items));
  }

  // 1件削除
  delete(myItem: IMyItem): void {
      const items = this.fetch();
      const filteredItems = items.filter((_item) => {
          return _item.id !== myItem.id;
      });
      localStorage.setItem(MY_STORAGE_KEY, JSON.stringify(filteredItems));
  }
}
