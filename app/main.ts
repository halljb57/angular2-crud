/**
 * Created by xavi on 27/03/16.
 */
import {bootstrap} from 'angular2/platform/browser';
import {provide} from 'angular2/core';
import {HTTP_PROVIDERS} from "angular2/http"
import {
    LocationStrategy,
    HashLocationStrategy,
    ROUTER_DIRECTIVES,
    ROUTER_PROVIDERS
} from 'angular2/router';
import {Api} from "./services/api"
import {InitComponent} from './components/init/init.component';

bootstrap(InitComponent, [
    HTTP_PROVIDERS,
    Api,
    ROUTER_PROVIDERS,
    ROUTER_DIRECTIVES,
    provide(LocationStrategy, {useClass: HashLocationStrategy})
]);
