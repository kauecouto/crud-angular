import { ComfirmationDialogComponent } from './../../../shared/components/comfirmation-dialog/comfirmation-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CoursesService } from '../../../services/courses.service';
import { OnInit } from '@angular/core'
import { Course } from '../../../models/course';
import { Component } from '@angular/core';
import { catchError, Observable, of} from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  courses$!: Observable<Course[]>

  constructor(
    private coursesService: CoursesService,
    public dialog: MatDialog,
    private route: Router,
    private activeRoute: ActivatedRoute,
    private snackBar : MatSnackBar
    ){
     this.refresh()
  }

  ngOnInit(): void {
  }

  refresh(){
    this.courses$ =  this.coursesService.coursesGetAll()
     .pipe(
      catchError( error => {
        this.openDialogError('Erro ao carregar os cursos.')
        return of([])
      }))
  }

  openDialogError(errorMenssage: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMenssage,
    });
  }

  onAdd(){
    this.route.navigate(['new'],{relativeTo: this.activeRoute})
  }

  onEdit(course: Course){
    this.route.navigate(['editar', course._id],{relativeTo: this.activeRoute})
  }

  onDelete(course: Course){
    const dialogRef = this.dialog.open(ComfirmationDialogComponent, {
      data: 'Deseja realmente remover esse curso?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if(result)
      this.coursesService.delete(course._id).subscribe({
        next: result => {
          this.refresh();
          this.snackBar.open('Curso removido com sucesso!','x', {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
          });
        },
        error: error => this.openDialogError('Erro ao tentar remover curso.')
    })
    });
  }
}
