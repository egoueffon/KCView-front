import { Component,Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {AuthenticationService} from "../services/authentication.service";
import {UsersService} from "../services/users.service";
import {User} from "../services/users.interface";
import {Subscription} from "rxjs";
//import { UserDialogComponent } from "app/fiche-journaliere/fiche-journaliere.module";


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {


    private users: User[];
    private subscription: Subscription;
    private isConnected: boolean;
    private currentUser: User;

    constructor(
        public dialog: MatDialog,
        private userService: UsersService,
        public authService: AuthenticationService,
    ) {

        this.updateUserState();

        this.subscription = this.authService.onConnectionChange.subscribe(isConnected => this.updateUserState());

    }

    private updateUserState() {
        this.isConnected = this.authService.isConnected();
        this.currentUser = this.authService.user;
    }

    ngOnInit(): void {

    }

    private onClickUser(user: User) {

        console.log("Show user dialog =>", user);

        //const dialogRef = this.dialog.open(UserDialogComponent);

        //dialogRef.componentInstance.user = user;

    }
}


