import { Component } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { SharedService } from './@shared/shared.service';
import {AuthService} from "./@app/auth/service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  deferredPrompt:any;
  constructor(private shared:SharedService, private auth:AuthService,private router:Router) {
  }
  ngOnInit() {
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      this.deferredPrompt = e;
      // Update UI notify the user they can install the PWA
      this.showInstallPromotion();
      // Optionally, send analytics event that PWA install promo was shown.
      // //console.log(`'beforeinstallprompt' event was fired.`);
    });
    window.addEventListener('appinstalled', () => {
      // Hide the app-provided install promotion
      //hideInstallPromotion();
      // Clear the deferredPrompt so it can be garbage collected
      this.deferredPrompt = null;
      // Optionally, send analytics event to indicate successful install
      // //console.log('PWA was installed');
    });
  }

  showInstallPromotion(){
    if (this.deferredPrompt !== undefined && this.deferredPrompt !== null) {
      // Show the prompt
      //console.log("showInstallPromotion")

      this.deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      this.deferredPrompt.userChoice
        .then((choiceResult:any) => {
          if (choiceResult.outcome === 'accepted') {
            //console.log('User accepted the A2HS prompt');
          } else {
            //console.log('User dismissed the A2HS prompt');
          }
          // We no longer need the prompt.  Clear it up.
          this.deferredPrompt = null;
        });
    }
  }

}
