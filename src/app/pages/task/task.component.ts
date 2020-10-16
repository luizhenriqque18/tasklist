import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {TaskService} from '../../services/task.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {isNotNullOrUndefined} from 'codelyzer/util/isNotNullOrUndefined';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  constructor(private service: TaskService) {
  }

  public formulario: FormGroup = new FormGroup({
    id : new FormControl(''),
    description : new FormControl(''),
    title : new FormControl('', [Validators.required])
  });

  public tasks: Array<any> = [];

  @ViewChild('childModal') closeModal: ElementRef;

  ngOnInit(): void {
    this.findAll();
  }

  saveOrUpdate(): void {
    const {id, title, description } = this.formulario.value;
    let manager: Observable<any>;
    if (this.formulario.status === 'INVALID'){
      this.formulario.markAllAsTouched();
    }else {
      console.log(isNotNullOrUndefined(id), id !== '');
      if (isNotNullOrUndefined(id) && id !== '') {
        manager = this.service.updateUsingPut({id, title, description });
      }else{
        manager = this.service.createUsingPost({title, description});
      }

      manager.subscribe(e => {
        this.closeModal.nativeElement.click();
        this.formulario.reset();
        this.findAll();
      });
    }
  }

  findAll(): void {
    this.service.findAllUsingGet().subscribe(resp => {
      this.tasks = resp;
    });
  }

  update(task: any): void {
    const { id, title, description } = task;
    this.formulario.patchValue({id, title, description });
    this.closeModal.nativeElement.click();
  }

  delete(id: any): void{
    this.service.deleteAllUsingDelete(id).subscribe(e => {
      this.findAll();
    });
  }

  cancel(): void {
    this.formulario.reset();
  }

  checked(id): void {
    this.service.changeStatusUsingPut({id}).subscribe(e => {
      this.findAll();
    });
  }
}
