import { Injectable } from '@angular/core';
import { IUsersService, User, SyntheseClub, Club } from "./users.interface";
import { Http, Headers, RequestOptions, URLSearchParams } from "@angular/http";
import "rxjs/add/operator/toPromise";
import { DatePipe } from '@angular/common';

@Injectable()
export class ClubService {

    constructor(private http: Http, private datepipe: DatePipe) { }

    getNbAbosClubBymonth(): Promise<number> {
        //console.log("find user by login", login);
        return this.http
            .get(`http://localhost:8080/getClubAbosByMonth?clubId=8&month=7&year=2017`)
            .map(response => response.json())
            .toPromise()
    }

    getClub(clubid: number): Promise<Club> {
        return this.http
            .get(`http://localhost:8080/club/8`)
            .map(response => response.json())
            .toPromise()
    }

    public clubid: number;

    getClubSynthese(clubid: number, date: Date): Promise<SyntheseClub> {
        //console.log("find user by login", login);

        this.clubid = clubid;
        let myParams = new URLSearchParams();
        myParams.append('clubId', clubid.toString());
        myParams.append('date', this.datepipe.transform(date, 'yyyy-MM-dd'));
        let options = new RequestOptions({ search: myParams });

        return this.http
            .get(`http://localhost:8080/getClubSynthese`, options)
            .map(response => response.json())
            .toPromise()
    }

    getCountClubAbosVPByDayForMonth(): Promise<any> {
        return this.http
            .get(`http://localhost:8080/test?clubId=8&month=10&year=2017`)
            .map(response => response.json())
            .toPromise()
    }

    getCountClubAbosVPByDayForWeek(): Promise<any> {
        return this.http
            .get(`http://localhost:8080/test2?clubId=8&week=42&year=2017`)
            .map(response => response.json())
            .toPromise()
    }
}
