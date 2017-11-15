import {Component, OnInit, AfterViewInit} from '@angular/core';
import {AuthenticationService} from "../services/authentication.service";
import {Router} from "@angular/router";
//import { MaterialModule } from '@angular/material';
import {UserCredential, User} from "../services/users.interface";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit, AfterViewInit {

    private credential: UserCredential = new UserCredential();
    private error: string;

   test3 = true;
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {

    }

    

    ngAfterViewInit() {
  

    setTimeout(()=>{    //<<<---    using ()=> syntax
      this.test3 = false;
 },700);
    }
    ngOnInit() {
 
    }



    

    login() {
console.log("find user by login");
this.test3 = true;
        this.error = "";

        this.authenticationService
            .authenticate(this.credential.login, this.credential.password)
            .then(user => {
                this.router.navigate(['accueil']);
            })
            .catch(err => {

                console.log(err);

                this.error = err._body;

            });
    }

}
