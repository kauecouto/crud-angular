import { CourseResolver } from './guards/course.resolver';
import { Course } from './../models/course';
import { CourseFormComponent } from './containers/course-form/course-form.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CoursesComponent } from './containers/courses/courses.component';

const routes: Routes = [
  {path: '', component: CoursesComponent},
  {path: 'new', component: CourseFormComponent, resolve: {course: CourseResolver}},
  {path: 'editar/:id', component: CourseFormComponent, resolve: {course: CourseResolver}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule {}
