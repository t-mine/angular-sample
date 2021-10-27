import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  items: string[] = ["やること1", "やること2", "やること3"];

  constructor() { }

  ngOnInit(): void {
  }

  addTodo(todo:string): void {
    this.items.push(todo);
  }

  removeTodo(index:number): void {
    this.items.splice(index, 1);
  }

}
