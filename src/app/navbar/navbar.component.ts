import {Component, OnInit, Input} from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../services/authentication.service";
import {User} from "../services/users.interface";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    private isConnected: boolean;
    /**
     *
     */
    @Input()
    private title: string;
    /**
     *
     */
    private subscription;

    constructor(
        private router: Router,
        public authService: AuthenticationService
    ) {

        this.subscription = this.authService.onConnectionChange.subscribe(isConnected => this.isConnected = isConnected);
        this.isConnected = this.authService.isConnected();

        console.log("check logged authenticated user", this.isConnected);

    }

    ngOnInit() {

    }

    /**
     *
     */
    private changeRoute() {

        if(!this.isConnected) {
            this.router.navigate(['login']);
        } else {
            this.authService.logout();
        }
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
