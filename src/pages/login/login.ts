import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, MenuController } from 'ionic-angular';
import { UserProvider } from "../../providers/user/user";
import { HttpProvider } from "../../providers/http/http";
import { User } from "../../models/user";

@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})

export class LoginPage {
    // Cette variable nous permets de pre-remplire les formulaire de login ou register.
    public account = {
        username: 'yajuve',
        fullname: 'Mohamed Raouf',
        email: 'mike.sylvestre@lyknowledge.io',
        password: 'themike'
    };


    public loginErrorString: string; // Message d'erreur lors de la connection
    private opt: string = 'signup'; // Definir le "tabs" par default. Soit inscription, soit connection

    constructor(
      public http: HttpProvider,
      public userProvider: UserProvider,
      public menuCtrl: MenuController,
      public navCtrl: NavController,
      public translateService: TranslateService) {
        this.menuCtrl.enable(false); // Pas d'affichage de menu
    }

    // Attempt to login in through our User service
    doLogin() {
        this.http.get('my-profile.json').subscribe(
          (profile:User) => { // Requet asyn. sur le fichier my-profile.json qui ce situe dans asset mocks et le contenu du fichier est mise dans la variable profile
            this.userProvider.user = < User > profile; // Ajout du profile user dans la class UserProvider grace au setter. Grace a sa, nous pouvont recuperer le profile à tout moments vu qu'il est stocker dans la class UserProvider
            if( this.checkedUser(profile))
              this.navCtrl.setRoot('ListFriendsPage'); // setRoot -> permet de supprimer toutes les vues de la stack et de naviguer vers la root page.
            else{
              this.account.email = 'mike.sylvestre@lyknowledge.io';
              this.account.password = 'themike';
              this.translateService.get('LOGIN_ERROR').subscribe((value) => { // translateService permet d'effectuer du multi-langue.
              // subscribe -> concept des PROMISE - OBSERVABLE, le traitement ce fait de manier asynch.
                  this.loginErrorString = value; // Affichage du message d'erreur dans la page html via la variable "loginErrorString"
              })
            }
            // navCtrl -> Permmet de naviger sur plusieurs page
        }, (err) => {
            console.error(err); // En cas d'erreur sur la recup de l'utilisateur
        });
        console.log("MIKE'")
    }

    checkedUser(users:User){
      /*
      if( users.email === this.account.email && users.password === this.account.password )
        return true;
      else
        return false;
      */

        return ( users.email === this.account.email && users.password === this.account.password ) ? true : false
    }
}
