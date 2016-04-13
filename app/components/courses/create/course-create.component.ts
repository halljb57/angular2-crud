/**
 * Created by xavi on 27/03/16.
 */
import {Component} from 'angular2/core';
//import {Api} from "../../../services/api";
import {CoursesForm} from '../form/course-form.component';

@Component({
    selector: 'course-create',
    templateUrl: './app/components/courses/create/index.html',
    directives: [CoursesForm]
})

export class CourseCreateComponent
{
    course: Object = {
        author: '',
        name: '',
        description: '',
        price: ''
    };
}