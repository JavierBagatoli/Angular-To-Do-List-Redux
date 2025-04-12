import { ApplicationRef, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ListToDoComponent } from "./global/components/list-to-do/list-to-do.component";
import { Store } from '@ngrx/store';
import { TaskItemsState } from './core/store/task.store';
import { selectIsLoadingMemory, selectIsOpenModal, selectMemoryTask, selectslotListFavourite } from './core/selector/task.selector';
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
    RouterOutlet,
    ButtonModule,
    ListToDoComponent,
    DialogModule,
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
  memoryLength : number[] = [];
  
  title = 'ToDoList';
  editTitle : boolean = false;
  loadingTaskId : number = -1;
  loadingModal: boolean = false;

  slotID : number = -1

  constructor(private cdr: ChangeDetectorRef) {}
  
  
  ngOnInit(): void {
    this.title = localStorage.getItem("titleToDoList") || "To Do List"

    this.store.dispatch(taskActions.getTask());

    this.store.select(selectslotListFavourite).subscribe(
      val => {
        this.activateLoadingTask()
        this.cdr.detectChanges()
      }
    )

    this.store.select(selectIsLoadingMemory).subscribe(
      val => {
        this.slotID = val?.slot!
        this.activateLoadingTask()
        this.valuesToDelete = val || {slot: -1, id: -1}
        this.cdr.detectChanges()
      }
    )

    this.store.select(selectMemoryTask).subscribe(
      val => {
 
        this.activateLoadingModal();
        this.activateLoadingTask();
        this.memoryLength = []

        if(val.slotListFavourite !== -1){
          this.memoryLength.push(val.slotListFavourite)
        };

        val.memory.forEach((item, index) => {
          if(item.listOfTasks.length && index !== val.slotListFavourite){
            this.memoryLength.push(index);
          }
        });

        this.memoryLength.push(this.memoryLength.length+1);
        localStorage.setItem("memory", JSON.stringify(val.memory));
        localStorage.setItem("slotListFavourite", JSON.stringify(val.slotListFavourite));

        this.cdr.detectChanges()
      }
    )

    this.store.select(selectIsOpenModal).subscribe(
      () => this.activateLoadingModal()
    )
  }

  activateLoadingTask(){
    this.loadingTaskId = this.slotID;
    setTimeout(() => {
      this.loadingTaskId = -1;
    }, 1)
  }

  activateLoadingModal(){
    this.loadingModal = true;
    setTimeout(() => {
      this.loadingModal = false;
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
