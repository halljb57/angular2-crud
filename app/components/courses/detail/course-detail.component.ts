/**
 * Created by xavi on 27/03/16.
 */
import {Component} from 'angular2/core';
import {RouteParams} from "angular2/router"
import {Api} from "../../../services/api";

import {
    ROUTER_DIRECTIVES
} from 'angular2/router';

@Component({
    templateUrl: './app/components/courses/detail/index.html',
    directives: [ROUTER_DIRECTIVES]
})

export class CourseDetailComponent
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