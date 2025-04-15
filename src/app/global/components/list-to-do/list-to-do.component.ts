import { ApplicationRef, ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentRef, inject, input, OnDestroy, OnInit, signal } from '@angular/core';
import { ToDoComponent } from "../to-do/to-do.component";
import { ProgressBarModule } from 'primeng/progressbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TaskItemsState } from '../../../core/store/task.store';
import { Store } from '@ngrx/store';
import { taskActions } from '../../../core/action/task.action';
import { ItemList } from '../../../core/interface/task.interface';
import { selectTaskItems0, selectTaskItems1, selectTaskItems10, selectTaskItems2, selectTaskItems3, selectTaskItems4, selectTaskItems5, selectTaskItems6, selectTaskItems7, selectTaskItems8, selectTaskItems9 } from '../../../core/selector/task.selector';
import { ListoToDoComponent } from "../input-text/input-text.component";
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-to-do',
  standalone: true,
  imports: [
    ToDoComponent,
    ProgressBarModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    ListoToDoComponent,
    CardModule,
    DividerModule
],
  templateUrl: './list-to-do.component.html',
  styleUrl: './list-to-do.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ListToDoComponent implements OnInit, OnDestroy{
  private readonly store = inject(Store<{task : TaskItemsState}>)
  listTask  : ItemList[] = [];

  editTitle : boolean = false;
  titleInput: string = "";
  title     : string = "";
  slot = input.required<number>();
  isFavouriteList = input.required<number>();
  statusBarPorcent: number = 0;
  isShowList: boolean = false;
  showAll : boolean = false;

  subs$ : Subscription = new Subscription()


  constructor(private cdr: ChangeDetectorRef){}

  ngOnDestroy(): void {
    this.subs$.unsubscribe();
  }

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

  addTask($nameItem :string):void{
    if($nameItem.length > 0){
      this.store.dispatch(taskActions.addTask({
        slot: this.slot(),
        task: {
          id: this.listTask.length || 0,
          label: $nameItem!,
          status: false,
        }}
      ))  
    }
  }

  showList(){
    this.isShowList = true
  }

  saveNewTitle($title: string){
    this.editTitle = false;
    if($title.length > 0){
      this.title = $title;
      this.store.dispatch(taskActions.updateNameList({
        slot: this.slot(),
        nameList: this.title}
      ));
    } 
  }

  private selectSlot(slot: number):void{ 
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
    this.cdr.detectChanges();
  }

  switchFavouriteList(){
    this.store.dispatch(
      taskActions.markListAsFavourite({slot: this.slot()})
    );
  }

  openDeleteAllList(){
    this.store.dispatch(taskActions.openDeleteList({slot: this.slot()}));
  }
}