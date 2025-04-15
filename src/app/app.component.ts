import { ApplicationRef, ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ListToDoComponent } from "./global/components/list-to-do/list-to-do.component";
import { Store } from '@ngrx/store';
import { TaskItemsState } from './core/store/task.store';
import { selectIsLoadingMemory, selectIsOpenModal, selectIsOpenModalDeleteList, selectMemoryTask, selectslotListFavourite } from './core/selector/task.selector';
import { taskActions } from './core/action/task.action';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { SlotAndID } from './core/interface/task.interface';
import { SkeletonModule } from 'primeng/skeleton';
import { ListoToDoComponent } from "./global/components/input-text/input-text.component";
import { DividerModule } from 'primeng/divider';
import { ToDoComponent } from "./global/template/modal-edit-task/modal-edit-task.component";
import { Subscription } from 'rxjs';
import { ModalInfoComponent } from "./global/template/modal-info/modal-info.component";
import { downloadData, uploadData } from './core/service/download.service';
import { ModalDeleteListComponent} from "./global/template/modal-delete-list/modal-delete-list.component";

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
    ToDoComponent,
    ModalInfoComponent,
    ModalDeleteListComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy{
  private readonly store = inject(Store<{task : TaskItemsState}>)
  
  valuesToDelete : SlotAndID= {slot: -1, id: -1}

  showModalDelete: boolean = false;
  memoryLength : number[] = [];
  
  title = 'ToDoList';
  editTitle : boolean = false;
  loadingTaskId : number = -1;
  loadingModal: boolean = false;

  slotID : number = -1
  slotFavourite : number = -1

  modalInfoIsOpen : string = "";

  constructor(private cdr: ChangeDetectorRef) {}

  subs$ = new Subscription()
  
  ngOnDestroy(): void {
    this.subs$.unsubscribe()
  }
  
  ngOnInit(): void {
    this.title = localStorage.getItem("titleToDoList") || "To Do List"

    this.store.dispatch(taskActions.getTask());

    this.subs$.add(
      this.store.select(selectIsLoadingMemory).subscribe(
        val => {
          this.slotID = val?.slot!
          this.activateLoadingTask()
          this.valuesToDelete = val || {slot: -1, id: -1}
          this.cdr.detectChanges()
        }
      )
    )

    this.subs$.add(
      this.store.select(selectIsOpenModalDeleteList).subscribe(
        () => this.activateLoadingModal()
      )
    )
    
    this.subs$.add(
  this.store.select(selectMemoryTask).subscribe(
    val => {
      this.slotFavourite = val.slotListFavourite;
      this.activateLoadingModal();
      this.activateLoadingTask();

      this.loadMemoryList(val)

      this.memoryLength.push(this.memoryLength.length+1);
      localStorage.setItem("memory", JSON.stringify(val.memory));
      localStorage.setItem("slotListFavourite", JSON.stringify(val.slotListFavourite));

      this.cdr.detectChanges()
    }
  )
    )
    
    this.subs$.add(
      this.store.select(selectIsOpenModal).subscribe(
        () => this.activateLoadingModal()
      )
    )
    
    this.cdr.detectChanges()
  }

  loadMemoryList(val: {memory: any[], slotListFavourite: number}){
    this.memoryLength = []

    if(val.slotListFavourite !== -1){
      this.memoryLength.push(val.slotListFavourite)
    };

    val.memory.forEach((item, index) => {
      if(item.listOfTasks.length && index !== val.slotListFavourite){
        this.memoryLength.push(index);
      }
    });
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

  download(){
    downloadData()
  }

  cargarArchivo(event: Event) {
    uploadData(event);
  }
}
