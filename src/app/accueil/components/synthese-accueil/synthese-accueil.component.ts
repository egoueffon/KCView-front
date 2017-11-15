import { Component, OnInit, ViewChild} from '@angular/core';
import { AuthenticationService } from "app/services/authentication.service";
import { SyntheseClub } from "app/services/users.interface";
import { ClubService } from "app/services/club.service";
import { UIChart } from "primeng/components/chart/chart";
import { MatButtonToggleChange } from "@angular/material/button-toggle";

import * as c3 from 'c3';

@Component({
    selector: 'app-synthese-accueil',
    templateUrl: './synthese-accueil.component.html',
    styleUrls: ['./synthese-accueil.component.css']
})
export class SyntheseAccueilComponent implements OnInit {

    statAbosVPByDayForMonth: any;

    data: any;

    dataMonth: any;

    options: any;

    bar:boolean = false;

    chartype:string = "bar";

    @ViewChild('chart') chart: UIChart; 

    knOptions = {
    animate:{ enabled: true, duration: 1000, ease: 'linear' },
    readOnly: true,
    size: 140,
    unit: '%',
    textColor: '#000000',
    fontSize: '32',
    fontWeigth: '300',
    fontFamily: 'Roboto',
    valueformat: 'percent',
    value: 0,
    max: 100,
    trackWidth: 19,
    barWidth: 10,
    trackColor: '#D8D8D8',
    barColor: '#FFFF6B',
    subText: {
      enabled: true,
      fontFamily: 'Verdana',
      font: '14',
    //   fontWeight: 'bold',
      text: '',
      color: '#000000',
      offset: 7
    },
  }
  valueTC = 20; 
  valueC = 35; 
  valueSA = 45; 

    clubSynthese: SyntheseClub = new SyntheseClub;
    constructor(public clubService: ClubService, public authService: AuthenticationService) {


        this.options = {
            scales: {
                xAxes: [{
                    //barThickness : 10,
                    gridLines: {
                        display: false
                    }
                }]
            },
            legend: {
                position: 'top'
            }
        };
    }



    ngOnInit() {

  var chart = c3.generate({
        bindto: '#visitor',
        data: {
            columns: [
                ['TC', 30],
                ['C', 30],
                ['Sans engagement', 40],
            ],
            
            type : 'donut',
            onclick: function (d, i) { console.log("onclick", d, i); },
            onmouseover: function (d, i) { console.log("onmouseover", d, i); },
            onmouseout: function (d, i) { console.log("onmouseout", d, i); }
        },
        donut: {
            label: {
                show: false
              },
            title: "Sources",
            width:20,
            
        },
        
        legend: {
          hide: false
          //or hide: 'data1'
          //or hide: ['data1', 'data2']
        },
        color: {
              pattern: ['#eceff1', '#745af2', '#26c6da']
        }
    });



        this.clubService.getClubSynthese(this.authService.user.club.id, new Date).then(clubSynthese => {
            //console.log("Users2 =>", clubSynthese);
            this.clubSynthese = clubSynthese;
        });

        this.clubService.getCountClubAbosVPByDayForMonth().then(stat => {
            //console.log("Users2 =>", clubSynthese);
            this.statAbosVPByDayForMonth = stat;

            this.dataMonth = {
                labels: stat.jours,
                datasets: [
                    {
                        label: 'Abonnement',
                        backgroundColor: '#42A5F5',
                        borderColor: '#42A5F5',
                        data: stat.abos,
                        fill: this.bar
                    },
                    {
                        label: 'Visite perdue',
                        backgroundColor: '#9CCC65',
                        borderColor: '#9CCC65',
                        data: stat.vps,
                        fill: this.bar
                    },
                    {
                        label: 'Abonnement N-1',
                        backgroundColor: '#FFFF6B',
                        borderColor: '#FFFF6B',
                        data: stat.abosnm1,
                        fill: this.bar
                    },
                    {
                        label: 'Visite perdue N-1',
                        backgroundColor: '#D8D8D8',
                        borderColor: '#D8D8D8',
                        data: stat.vpsnm1,
                        fill: this.bar
                    }
                ]
            }
        });

        this.clubService.getCountClubAbosVPByDayForWeek().then(stat => {

            this.statAbosVPByDayForMonth = stat;

            this.data = {
                labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
                datasets: [
                    {
                        label: 'Abonnement',
                        backgroundColor: '#42A5F5',
                        borderColor: '#1E88E5',
                        data: stat.abos
                    },
                    {
                        label: 'Visite perdue',
                        backgroundColor: '#9CCC65',
                        borderColor: '#7CB342',
                        data: stat.vps
                    }
                ]
            }
        });


    }

    changetest(event:MatButtonToggleChange){
        this.chartype=event.value;
        this.chart.reinit();
    }

        

}
