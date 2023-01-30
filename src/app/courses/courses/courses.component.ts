import { ErrorDialogComponent } from './../../shared/components/error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CoursesService } from './../../services/courses.service';
import { OnInit } from '@angular/core'
import { Course } from './../../models/course';
import { Component } from '@angular/core';
import { catchError, Observable, of} from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  courses$: Observable<Course[]>
  displayedColumns: string[] = ['name','category','actions']

  constructor(
    private coursesService: CoursesService,
    public dialog: MatDialog,
    private route: Router,
    private activeRoute: ActivatedRoute
    ){
     this.courses$ =  this.coursesService.coursesGetAll()
     .pipe(
      catchError( error => {
        this.openDialog('Erro ao carregar os cursos.')
        return of([])
      }))
  }

  ngOnInit(): void {
  }

  openDialog(errorMenssage: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMenssage,
    });
  }

  onAdd(){
    this.route.navigate(['new'],{relativeTo: this.activeRoute})
  }
}
