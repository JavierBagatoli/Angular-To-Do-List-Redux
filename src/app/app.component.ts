import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ToDoComponent } from "./global/components/to-do/to-do.component";
import { ItemList, ListoToDoComponent } from "./global/components/listo-to-do/list-to-do.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ButtonModule, ToDoComponent, ListoToDoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ToDoList';
  list1 : ItemList[]= [
    {label: 'Desayunar', status: true},
    {label: 'Entranar', status: true},
    {label: 'Trabajar', status: false},
    {label: 'Estudiar', status: false},
    {label: 'Almorzar', status: false}
  ]
}
