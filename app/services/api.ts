/**
 * Created by xavi on 27/03/16.
 */
import {Http, Headers, Response} from "angular2/http"
import {Injectable} from "angular2/core"
import {ICourse} from "../interfaces/ICourse"
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';

@Injectable()
export class Api
{
    apiUrl: string = "http://localhost:8000/api/courses/";
    headers: Headers = new Headers;
    courses$: Observable<ICourse[]>;
    private _coursesObserver: Observer<ICourse[]>;
    private _dataStore: {
        courses: ICourse[]
    };

    constructor(private _http: Http)
    {  //PETICIONS AJAX
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
        this.headers.append('X-Requested-With', 'XMLHttpRequest');

        this.courses$ = new Observable(observer => this._coursesObserver = observer).share();
        this._dataStore = { courses: [] };
    }

    public getCourses()
    {
        this._http.get(this.apiUrl).map(response => response.json()).subscribe(data => {
            this._dataStore.courses = data.courses;
            this._coursesObserver.next(this._dataStore.courses);
        }, error => console.log('Could not load courses.'));
    }

    public getCourse(id)
    {
        return new Promise((resolve, reject) =>
        {
            this._http.get(this.apiUrl + id)
                .map((res: Response) => res.json())
                .subscribe(
                    (res) => {
                        resolve(res);
                    },
                    (error) => {
                        reject(error);
                    }
                );
        })
    }

    public createCourse(course)
    {
        return new Promise((resolve, reject) => {
            this._http.post(this.apiUrl, course, {
                    headers: this.headers
                })
                .map((res: Response) => res.json())
                .subscribe(
                    (res) => {
                        resolve(res);
                    },
                    (error) => {
                        reject(error);
                    }
                );
        })
    }

    public updateCourse(course, id)
    {
        return new Promise((resolve, reject) => {
            this._http.patch(this.apiUrl + id, course, {
                    headers: this.headers
                })
                .map((res: Response) => res.json())
                .subscribe(
                    (res) => {
                        resolve(res);
                    },
                    (error) => {
                        reject(error);
                    }
                );
        })
    }

    public deleteCourse(id)
    {
        this._http.delete(this.apiUrl + id, {
            headers: this.headers
        }).subscribe(response => {
            this._dataStore.courses.forEach((t, i) => {
                if (t.id === id) { this._dataStore.courses.splice(i, 1); }
            });
            this._coursesObserver.next(this._dataStore.courses);
        }, error => console.log('Could not delete course.'));
    }
}