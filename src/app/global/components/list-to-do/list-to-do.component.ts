import { ChangeDetectionStrategy, Component, inject, input, OnInit, signal } from '@angular/core';
import { ToDoComponent } from "../to-do/to-do.component";
import { ProgressBarModule } from 'primeng/progressbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TaskItemsState } from '../../../core/store/task.store';
import { Store } from '@ngrx/store';
import { taskActions } from '../../../core/action/task.action';
import { selectTaskItems } from '../../../core/selector/task.selector';

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


  title = input<string>();
  item  : string = ""
  statusBarPorcent: number = 0;

  ngOnInit(): void {
    this.store.select(selectTaskItems).subscribe(
      (val) => {
        console.table(val);
        this.listTask = val;
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
  
    this.statusBarPorcent = (temporalValue / this.listTask.length)*100
  }

  addTask(){
    if(this.item?.length > 0){
      this.store.dispatch(taskActions.addTask({task: {
        id: this.listTask.length || 0,
        label: this.item!,
        status: false,
      }}))  
    }
  }

  saveData(){
    localStorage.setItem("save0", JSON.stringify(this.listTask))
  }
}



export interface ItemList {
  id: number,
  label: string,
  status: boolean
}