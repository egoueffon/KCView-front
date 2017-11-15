import { Component, OnInit, OnDestroy  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {DomSanitizer,SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-kc-link',
  templateUrl: './kc-link.component.html',
  styleUrls: ['./kc-link.component.css']
})
export class KcLinkComponent implements OnInit {

  constructor(private route: ActivatedRoute, public sanitizer:DomSanitizer) { }
  public site: SafeResourceUrl;
  public site2: String = "https://www.teamkch.fr/";
  private sub: any;
 
  ngOnInit() {
    this.site = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.teamkch.fr/");  
    this.sub = this.route.params.subscribe(params => {
    this.site = this.sanitizer.bypassSecurityTrustResourceUrl(params['site']); // (+) converts string 'id' to a number
      console.log(params['site'])
       // In a real app: dispatch action to load the details here.
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
