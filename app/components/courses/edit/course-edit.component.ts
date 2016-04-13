/**
 * Created by xavi on 27/03/16.
 */
import {Component} from 'angular2/core';
import {Api} from "../../../services/api";
import {RouteParams} from "angular2/router"
import {CoursesForm} from '../form/course-form.component';

@Component({
    templateUrl: './app/components/courses/edit/index.html',
    directives: [CoursesForm]
})

export class CourseEditComponent
{
    course: Object = {};
    constructor(private _api: Api, private _params: RouteParams)
    {
        this._api.getCourse(_params.get("id")).then(
            (res) => {
                this.course = res.course;
            },
            (error) => {
                console.error(error);
            }
        )
    }
}