import { ChangeDetectionStrategy, Component, input, OnInit } from '@angular/core';
import { ToDoComponent } from "../to-do/to-do.component";
import { ProgressBarModule } from 'primeng/progressbar';

@Component({
  selector: 'app-listo-to-do',
  standalone: true,
  imports: [ToDoComponent, ProgressBarModule],
  templateUrl: './list-to-do.component.html',
  styleUrl: './list-to-do.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ListoToDoComponent{
  title = input<string>();
  list  = input<ItemList[]>([]);
  statusBarPorcent: number = 0;

  updateStatusBar(): void {
    let temporalValue = 0;
    
    this.list()!.forEach(
      (item: ItemList) => {
        if(item.status){
          temporalValue++
        }
      })

    this.statusBarPorcent = (temporalValue / this.list().length)*100
  }
}



export interface ItemList {
  label: string,
  status: boolean
}