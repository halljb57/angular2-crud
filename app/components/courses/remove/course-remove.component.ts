/**
 * Created by xavi on 27/03/16.
 */
import {Component, Input} from 'angular2/core';
import {Api} from "../../../services/api";

import {ROUTER_DIRECTIVES} from 'angular2/router';

declare var jQuery:any;

@Component({
    selector: 'course-remove',
    templateUrl: './app/components/courses/remove/index.html',
    directives: [ROUTER_DIRECTIVES]
})

export class CourseRemoveComponent
{
    @Input('course') course: Object;
    constructor(private _api: Api)
    {

    }

    remove(id)
    {
        this._api.deleteCourse(id);
        jQuery("#remove-course").modal("hide");
    }
}