import { ChangeDetectionStrategy, Component, inject, input, OnInit, signal } from '@angular/core';
import { ToDoComponent } from "../to-do/to-do.component";
import { ProgressBarModule } from 'primeng/progressbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TaskItemsState } from '../../../core/store/task.store';
import { Store } from '@ngrx/store';
import { taskActions } from '../../../core/action/task.action';
import { ItemList } from '../../../core/interface/task.interface';
import { selectTaskItems0 } from '../../../core/selector/task.selector';

@Component({
  selector: 'app-listo-to-do',
  standalone: true,
  imports: [
    ToDoComponent,
    ProgressBarModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
  ],
  templateUrl: './list-to-do.component.html',
  styleUrl: './list-to-do.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ListoToDoComponent implements OnInit{
  private readonly store = inject(Store<{task : TaskItemsState}>)
  listTask : ItemList[] = []


  title : string = ""
  slot = input.required<number>()
  item  : string = ""
  statusBarPorcent: number = 0;

  ngOnInit(): void {
    this.store.select(selectTaskItems0).subscribe(
      (val) => {
        this.title = val.name;
        this.listTask = val.listOfTasks;
        this.updateStatusBar();
      }
    )
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
    console.log(this.statusBarPorcent)
  }

  addTask(){
    if(this.item?.length > 0){
      this.store.dispatch(taskActions.addTask({
        slot: 0,
        task: {
          id: this.listTask.length || 0,
          label: this.item!,
          status: false,
        }}
      ))  
    }
  }

  saveData(){
    localStorage.setItem(`slot${this.slot()}`, JSON.stringify(this.listTask))
  }
}



