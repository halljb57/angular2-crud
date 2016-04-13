/**
 * Created by xavi on 27/03/16.
 */
import {Component} from 'angular2/core';
import {Api} from "../../../services/api";

import {
    ROUTER_DIRECTIVES
} from 'angular2/router';

@Component({
    selector: 'course',
    templateUrl: './app/components/courses/list/index.html',
    directives: [ROUTER_DIRECTIVES]
})

export class CourseListComponent
{
    courses: Object;
    selectedCourse: Object = {};
    constructor(private _api: Api)
    {
        this.courses = this._api.courses$;
        this._api.getCourses();
    }
}