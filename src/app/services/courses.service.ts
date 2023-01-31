import { Course } from './../models/course';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { delay, first} from 'rxjs/operators'

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

  getById(id: string){
    return this.http.get<Course>(`${this.API}/${id}`).pipe(first())
    }

  save(data: Partial<Course>){
    if(data._id){
      console.log('update')
      return this.update(data)
    }
    return this.create(data)
  }

  private create(data: Partial<Course>){
    return this.http.post<Course>(this.API, data).pipe(first())
  }

  private update(data: Partial<Course>){
    return this.http.put<Course>(`${this.API}/${data._id}`, data).pipe(first())
  }

  delete(id: string){
    return this.http.delete(`${this.API}/${id}`).pipe(first())
  }
}
