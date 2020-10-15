import { Component, OnInit } from '@angular/core';
import {TaskService} from './services/task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'tasklist';

  constructor(private service: TaskService) {
  }

  ngOnInit(): void {
    this.service.findAllUsingGet().subscribe(e => console.log(e));
  }
}
