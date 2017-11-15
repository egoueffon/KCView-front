import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UsersService} from "../services/users.service";
import {User} from "../services/users.interface";

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

    private user: User = new User();
    private error: string;

    constructor(
        private router: Router,
        private userService: UsersService
    ) { }

    ngOnInit() { }

    signup() {

        this.userService
            .exists(this.user.login)
            .then(exists => {


                if (!exists) {
                    return this.userService
                        .create(this.user)
                        .then(user => this.router.navigate(['/login']));
                }

                this.error = "L'utilisateur existe déjà !";

                console.log(this.error);

            })

            .catch(err => {
                console.error(err);
            });

    }

}
