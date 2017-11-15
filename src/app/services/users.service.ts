import { Injectable } from '@angular/core';
import { IUsersService, User } from "./users.interface";
import {Http} from "@angular/http";
import "rxjs/add/operator/toPromise";

@Injectable()
export class UsersService implements IUsersService {

    constructor(private http: Http) { }


    create(user: User): Promise<User> {
        return this.http
            .post('/api/users', {user})
            .map(response => response.json())
            .toPromise();
    }

    exists(email: string): Promise<boolean> {
        return this.http
            .get(`/api/users/exists/${email}`)
            .map(response => response.json())
            .toPromise();
    }

    getUsers(): Promise<User[]> {
        return this.http
            .get('http://localhost:8080/AllUsers')
            .map(response => response.json())
            .toPromise();
    }


    get(email: string): Promise<User> {
        console.log("find user by email", email);
        return this.http
            .get(`/api/users/${email}`)
            .map(response => response.json())
            .toPromise();

    }   

    getUser(login: string, password: String): Promise<User> {
        console.log("find user by login", login);
        return this.http
            .get(`http://localhost:8080/getEmp?login=${login}&password=${password}`)
            .map(response => response.json())
            .toPromise()
    }
}
