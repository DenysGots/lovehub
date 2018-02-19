/**
 * Implementation of the Mock-Backend
 */

import {
    Http,
    BaseRequestOptions,
    Response, ResponseOptions,
    RequestMethod,
    XHRBackend,
    RequestOptions
} from '@angular/http';

import {
    MockBackend,
    MockConnection
} from '@angular/http/testing';

import { fakeUser } from './fakeUser';
import { User } from '../models/user';

export function fakeBackendFactory (backend: MockBackend, options: BaseRequestOptions, realBackend: XHRBackend) {
// first, get user from the local storage or initial data array
let data: User = JSON.parse(localStorage.getItem('user')) || fakeUser;

// configure fake backend
backend.connections.subscribe((connection: MockConnection) => {
    // wrap in timeout to simulate server api call
    setTimeout(id => {

       // TODO: Request-URL mapping to mock data
       // get user
        if (connection.request.url.endsWith(`/fake-backend/users/${id}`) &&
        connection.request.method === RequestMethod.Get) {
        connection.mockRespond(new Response(new ResponseOptions({
            status: 200,
            body: data
        })));

        return;
        }

        // update user
        if (connection.request.url.endsWith(`/fake-backend/users/${id}`) &&
        connection.request.method === RequestMethod.Put) {
        const receivedUser = JSON.parse(connection.request.getBody());
        const clonedUser = Object.assign({}, receivedUser);
        let userWasFound = false;
        if (data.id === clonedUser.id) {
            data = clonedUser;
            userWasFound = true;
            return true;
        }

        if (!userWasFound) {
            connection.mockRespond(new Response(new ResponseOptions({
                status: 400,
                body: 'User could not be updated because was not found'
            })));
        } else {
            localStorage.setItem('user', JSON.stringify(data));

            connection.mockRespond(new Response(new ResponseOptions({status: 200})));
        }

        return;
        }

        // pass through any requests not handled above
        const realHttp = new Http(realBackend, options);
        const requestOptions = new RequestOptions({
            method: connection.request.method,
            headers: connection.request.headers,
            body: connection.request.getBody(),
            url: connection.request.url,
            withCredentials: connection.request.withCredentials,
            responseType: connection.request.responseType
        });
        realHttp.request(connection.request.url, requestOptions)
            .subscribe((response: Response) => {
                connection.mockRespond(response);
            },
            (error: any) => {
                connection.mockError(error);
            });
    }, 500);

});

return new Http(backend, options);
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service
    provide: Http,
    useFactory: fakeBackendFactory,
    deps: [MockBackend, BaseRequestOptions, XHRBackend]
};
