import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

import { CoursesService } from '../../../services/courses.service';
import { Course } from './../../../models/course';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {

  form = this.formBuilder.group({
    _id: [''],
    name: ['', [Validators.required,
      Validators.minLength(5),
      Validators.maxLength(100)]],
    category: ['', [Validators.required]]
  })
  constructor(private formBuilder: NonNullableFormBuilder,
    private serviceCourses: CoursesService,
    private snackBar: MatSnackBar,
    private location: Location,
    private activatedRouted: ActivatedRoute
    ){
  }

  ngOnInit(): void {
    const course : Course = this.activatedRouted.snapshot.data['course']
    this.form.setValue(course)
  }

  onSubmit(){
    this.serviceCourses.save(this.form.value)
    .subscribe({
      next: result => this.onSucess(),
      error:error =>  this.onError()})
  }

  onCancel(){
    this.location.back()
  }

  private onSucess(){
    this.snackBar.open('Curso salvo com sucesso!','', {duration: 5000});
    this.onCancel()
  }

  private onError(){
    this.snackBar.open('Erro ao salvar curso!','', {duration: 5000});
  }

  getErrorMessage(fildName: string) {
    const field = this.form.get(fildName)

    if (field?.hasError('required')) {
      return 'Campo Obrigatório';
    }

    if (field?.hasError('minlength')) {
      const requiredlength = field.errors ? field.errors['minlength']['requiredLength'] : 5;
      return `Tamanho minimo de ${requiredlength} caracteres`;
    }

    if (field?.hasError('maxlength')) {
      const requiredlength = field.errors ? field.errors['maxlength']['requiredLength'] : 100;
      return `Tamanho máximo excedido de ${requiredlength} caracteres`;
    }

    return 'Campo invalido';
  }

}
