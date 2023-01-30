import { Course } from './../models/course';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { first} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private readonly API: string = 'api/courses'
  constructor(private http: HttpClient) { }

  coursesGetAll(){
    return this.http.get<Course[]>(this.API).pipe(
      first()
    )
  }
}
