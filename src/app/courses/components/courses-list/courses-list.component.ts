import { Course } from './../../../models/course';
import { Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent {

 @Input() courses: Course[] = []
 @Output() add = new EventEmitter(false)
 @Output() edit = new EventEmitter(false)
 @Output() delete = new EventEmitter(false)
  readonly displayedColumns: string[] = ['name','category','actions']

  constructor(){}

  onAdd(){
    this.add.emit()
  }

  onEdit(course :Course){
    this.edit.emit(course)
  }

  onDelete(course: Course){
    this.delete.emit(course)
  }
}
