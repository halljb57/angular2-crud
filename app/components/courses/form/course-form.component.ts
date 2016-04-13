/**
 * Created by xavi on 27/03/16.
 */
import {Component, Input} from 'angular2/core';
import {Router, ROUTER_DIRECTIVES} from 'angular2/router'
import {Api} from "../../../services/api";
import {ICourse} from "../../../interfaces/ICourse";

@Component({
    selector: 'courses-form',
    templateUrl: './app/components/courses/form/course-form.html',
    directives: [ROUTER_DIRECTIVES]
})

export class CoursesForm {
    @Input('course') course: ICourse;
    @Input('isUpdate') isUpdate: boolean = false;
    @Input('action') action: string;
    errors: Array<Object> = [];

    constructor(private _router: Router, private _api: Api){

    }

    processCourse(course): void {
        !this.isUpdate ? this.save(course) : this.update(course);
    }

    save(course)
    {
        let course_string = this._courseString(course);

        this._api.createCourse(course_string).then(
            (res) => {
                this._router.navigate(['/Courses']);
            },
            (error) => {
                if(error.status === 422) //código de respuesta de laravel cuando falla la validación
                {
                    this.errors = [];
                    let errors = error.json();
                    for(var key in errors) {
                        this.errors.push(errors[key]);
                    }
                }
            }
        );
    }

    update(course)
    {
        let course_string = this._courseString(course);

        this._api.updateCourse(course_string, course.id).then(
            (res) => {
                this._router.navigate(['/Courses']);
            },
            (error) => {
                if(error.status === 422)//código de respuesta de laravel cuando falla la validación
                {
                    this.errors = [];
                    let errors = error.json();
                    for(var key in errors) {
                        this.errors.push(errors[key]);
                    }
                }
            }
        );
    }

    private _courseString(course): string{
        return "&author="+course.author+
            "&name="+course.name+
            "&description="+course.description+
            "&price="+course.price;
    }
}