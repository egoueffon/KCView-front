import { Pipe, PipeTransform } from '@angular/core';
import { User } from "app/services/users.interface";

@Pipe({
    name: 'usersOnline'
})
export class UsersOnlinePipe implements PipeTransform {

    transform(users: User[] = [], showOnline: boolean = true): any {

        return true;

    }

}
