import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ListoToDoComponent } from "./global/components/list-to-do/list-to-do.component";
import { Store } from '@ngrx/store';
import { TaskItemsState } from './core/store/task.store';
import { selectIsOpenDeleteModal, selectMemoryTask } from './core/selector/task.selector';
import { taskActions } from './core/action/task.action';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { ItemList } from './core/interface/task.interface';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    SkeletonModule,
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

  loading = false;

  ngOnInit(): void {
    this.store.dispatch(taskActions.getTask());

    this.store.select(selectIsOpenDeleteModal).subscribe(
      val => {
        this.showModalDelete = val || false;
      }
    );

    this.store.select(selectMemoryTask).subscribe(
      val => localStorage.setItem("memory", JSON.stringify(val))
    )
  }

  deleteTask(){
    this.loading = true;
    this.store.dispatch(taskActions.deleteTask());
    setTimeout(() => {
      this.loading = false;
      console.log(false)

    }, 500)
  }

  closeDeleteModal(){
    this.loading = true;
    console.log(true)
    this.store.dispatch(taskActions.closeDeleteModal());
        this.loading = true;
    setTimeout(() => {
      this.loading = false;
      console.log(false)

    }, 100)
  }
}
