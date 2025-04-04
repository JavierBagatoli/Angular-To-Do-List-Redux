import { ChangeDetectionStrategy, Component, inject, input, OnInit, signal } from '@angular/core';
import { ToDoComponent } from "../to-do/to-do.component";
import { ProgressBarModule } from 'primeng/progressbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TaskItemsState } from '../../../core/store/task.store';
import { Store } from '@ngrx/store';
import { taskActions } from '../../../core/action/task.action';
import { ItemList } from '../../../core/interface/task.interface';
import { selectTaskItems0, selectTaskItems1, selectTaskItems10, selectTaskItems2, selectTaskItems3, selectTaskItems4, selectTaskItems5, selectTaskItems6, selectTaskItems7, selectTaskItems8, selectTaskItems9 } from '../../../core/selector/task.selector';

@Component({
  selector: 'app-listo-to-do',
  standalone: true,
  imports: [
    ToDoComponent,
    ProgressBarModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonModule
  ],
  templateUrl: './list-to-do.component.html',
  styleUrl: './list-to-do.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ListoToDoComponent implements OnInit{
  private readonly store = inject(Store<{task : TaskItemsState}>)
  listTask  : ItemList[] = []

  editTitle : boolean = false;
  titleInput: string = ""
  title     : string = ""
  slot = input.required<number>()
  item      : string = ""
  statusBarPorcent: number = 0;

  ngOnInit(): void {
    this.selectSlot(this.slot());
  }

  updateStatusBar(): void {
    let temporalValue = 0;
    
    this.listTask.forEach(
      (item: ItemList) => {
        if(item.status){
          temporalValue++
        }
      })
  
    this.statusBarPorcent = Math.round( (temporalValue / this.listTask.length)*100) || 0
  }

  addTask():void{
    if(this.item?.length > 0){
      this.store.dispatch(taskActions.addTask({
        slot: this.slot(),
        task: {
          id: this.listTask.length || 0,
          label: this.item!,
          status: false,
        }}
      ))  
    }
    this.item = ""
  }

  saveNewTitle(){
    this.editTitle = false;
    this.title = this.titleInput;
    this.store.dispatch(taskActions.updateNameList({
      slot: this.slot(),
      nameList: this.title}
    ));  
  }

  private selectSlot(slot: number):void{
    let selector = null; 
    switch (slot) {
      case 0:
        this.store.select(selectTaskItems0).subscribe(
          (val) => {
            this.setData(val)
          }
        )
        break;
      case 1:
        this.store.select(selectTaskItems1).subscribe(
          (val) => {
            this.setData(val)
          }
        )
        break;
      case 2:
        this.store.select(selectTaskItems2).subscribe(
          (val) => {
            this.setData(val)
          }
        )
        break;
      case 3:
        this.store.select(selectTaskItems3).subscribe(
          (val) => {
            this.setData(val)
          }
        )
        break;
      case 4:
        this.store.select(selectTaskItems4).subscribe(
          (val) => {
            this.setData(val)
          }
        )
        break;
      case 5:
        this.store.select(selectTaskItems5).subscribe(
          (val) => {
            this.setData(val)
          }
        )
        break;
      case 6:
        this.store.select(selectTaskItems6).subscribe(
          (val) => {
            this.setData(val)
          }
        )
        break;
      case 7:
        this.store.select(selectTaskItems7).subscribe(
          (val) => {
            this.setData(val)
          }
        )
        break;
      case 8:
        this.store.select(selectTaskItems8).subscribe(
          (val) => {
            this.setData(val)
          }
        )
        break;
      case 9:
        this.store.select(selectTaskItems9).subscribe(
          (val) => {
            this.setData(val)
          }
        )
        break;
      case 10:
        this.store.select(selectTaskItems10).subscribe(
          (val) => {
            this.setData(val)
          }
        )
        break;
    }
  }

   setData(val: any):void{
    this.title = val.name || "";
    this.listTask = val.listOfTasks;
    this.updateStatusBar();
  }
}