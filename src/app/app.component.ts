import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ListoToDoComponent } from "./global/components/list-to-do/list-to-do.component";
import { Store } from '@ngrx/store';
import { TaskItemsState } from './core/store/task.store';
import { selectIsOpenDeleteModal } from './core/selector/task.selector';
import { taskActions } from './core/action/task.action';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { ItemList } from './core/interface/task.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet, ButtonModule, ListoToDoComponent, DialogModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  private readonly store = inject(Store<{task : TaskItemsState}>)
  
  showModalDelete: boolean = false;
  title = 'ToDoList';
  list1 : ItemList[] = [];

  slot2 : {
    name: string,
    listOfTasks: ItemList[]
  } = {
    name: '',
    listOfTasks: []
  };

  ngOnInit(): void {
    this.store.dispatch(taskActions.getTask());

    this.store.select(selectIsOpenDeleteModal).subscribe(
      val => {
        this.showModalDelete = val || false;
      }
    );
  }

  deleteTask(){
    this.store.dispatch(taskActions.deleteTask());
  }

  closeDeleteModal(){
    this.store.dispatch(taskActions.closeDeleteModal());
  }
}
