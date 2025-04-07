import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ListToDoComponent } from "./global/components/list-to-do/list-to-do.component";
import { Store } from '@ngrx/store';
import { TaskItemsState } from './core/store/task.store';
import { selectIsLoadingMemory, selectIsOpenModal, selectMemoryTask } from './core/selector/task.selector';
import { taskActions } from './core/action/task.action';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { ItemList, SlotAndID } from './core/interface/task.interface';
import { SkeletonModule } from 'primeng/skeleton';
import { ListoToDoComponent } from "./global/components/input-text/input-text.component";
import { DividerModule } from 'primeng/divider';
import { ToDoComponent } from "./global/template/modal-edit-task/modal-edit-task.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    SkeletonModule,
    CommonModule,
    RouterOutlet, ButtonModule, ListToDoComponent, DialogModule,
    ListoToDoComponent,
    DividerModule,
    ToDoComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  private readonly store = inject(Store<{task : TaskItemsState}>)
  
  valuesToDelete : SlotAndID= {slot: -1, id: -1}

  showModalDelete: boolean = false;
  memoryLength : number[] = [0,1,2,3,4,5,6,7,8,9,10];
  
  title = 'ToDoList';
  editTitle : boolean = false;
  list1 : ItemList[] = [];
  loading = false;

  ngOnInit(): void {
    this.title = localStorage.getItem("titleToDoList") || "To Do List"

    this.store.dispatch(taskActions.getTask());

    this.store.select(selectIsLoadingMemory).subscribe(
      val => {
        this.deleteTask()
        this.valuesToDelete = val || {slot: -1, id: -1}}
    )

    this.store.select(selectMemoryTask).subscribe(
      val => {
        this.deleteTask()
        /*this.memoryLength = [];
        val.forEach((vector, index )=> {
          if(vector.listOfTasks.length > 0){this.memoryLength.push(index)}
        })
        this.memoryLength.push(this.memoryLength.length)*/
        localStorage.setItem("memory", JSON.stringify(val))}
    )
    this.store.select(selectIsOpenModal).subscribe(
      () => this.deleteTask()
    )
  }

  deleteTask(){
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      console.log(false)
    }, 1)
  }

  /*closeDeleteModal(){
    this.loading = true;
    console.log(true)
    this.store.dispatch(taskActions.closeModal());
        this.loading = true;
    setTimeout(() => {
      this.loading = false;
      console.log(false)

    }, 1)
  }*/

  saveNewTitle($title: string){
    if($title.length > 0){
      this.title = $title
      localStorage.setItem("titleToDoList", $title)
    }
    this.editTitle = false
  }

  switchDaily(){
    this.store.dispatch(taskActions.switchDailyModeTask());
  }
}
