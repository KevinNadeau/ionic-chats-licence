import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Util} from "../../providers/util/util";
import {User} from "../../models/user";
import {HttpProvider} from "../../providers/http/http";
import { UserProvider } from '../../providers/user/user';


@IonicPage()
@Component({
  selector: 'page-my-profile',
  templateUrl: 'my-profile.html',
})

export class MyProfilePage {

  public Util = Util;
  public oldEmail:string;
  private profile: User = new User();
  private isLoading: boolean = true;
  /* Creation de variable */
  private string:string = "Chaine de caract.";
  private intEtFloat:Number = 22.22;
  private boolean:boolean = true;
  private fourTout:any = { toto: "toto" };
  private fourToutArray:any = [{ toto: "toto" }];
  private instanceUser:User = new User();
  private tableauInt:Array<Number> = [22,11];
  private tableauTout:Array<any> = [22,1.1,true,[22], this.instanceUser];


  constructor(
    public http:HttpProvider,
    public navParams: NavParams,
    public navCtrl: NavController,
    private userProvider:UserProvider) {
  }

  ionViewDidLoad() {
    this.isLoading = false;
    this.profile = <User> this.userProvider.user;
    this.oldEmail = this.profile.email;
  }

  doSubmit() {
    if( this.oldEmail === this.profile.email){
      this.userProvider.updateUser(this.profile).then(
        data => this.navCtrl.setRoot("ListFriendsPage")
      )
    }else{
      this.userProvider.updateUser(this.profile, {type: true, email: this.oldEmail}).then(
        data => this.navCtrl.setRoot("ListFriendsPage")
      )
    }
  }

}
