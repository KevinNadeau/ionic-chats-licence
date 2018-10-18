import {Injectable} from '@angular/core';
import { Storage } from '@ionic/storage';
import { User } from '../../models/user';

@Injectable()
export class UserProvider {

  private _user:User = new User();
  private _status:Number = 0;

  constructor(private nativeStorage: Storage) {
    console.log('Hello UserProvider Provider');
    this.statusUsers().then(
      theStatus => this._status = theStatus
    )
  }

  get user():User {
    return this._user;
  }

  set user(value:User) {
    this._user = value;
  }

  statusUsers(){
    return this.nativeStorage.get('users')
    .then( // Tentative de récuperation de la data stocker via la key 'users'
      data => { // Tentative success - Le plugin à pu se connecter au stockage local
        if( data === null){ // Test si la data 'users' n'existe pas
          this.nativeStorage.set('users', []); // Création de la data 'users'
          return 0
        }else{ // Test si la data 'users' existe
          if(Array.isArray(data)) // Test si c'est un tableau
            return (data.length > 0)? 1 : -1;
          else{ // Test si c'est pas un tableau
            this.nativeStorage.set('users', []);
            return 0;
          }
        }
      },
      error => { // Tentative echec - Ont crée la data et ont recommence le test
        this.nativeStorage.set('users', []);
        return 0;
      }
    );
  }

  checkedEmail(email:string){
    return this.nativeStorage.get('users').then(
      users => {
        if( users !== null)
          for(let i = 0; i < users.length; i++){ // Boucle sur les elements stocker dans la key 'users
            if(users[i].email === email) // Test si l'email = l'email entrer en parametre
              return true;
          }
        return false;
      }
    )
  }

  registerUser( user:User ){
    return this.statusUsers().then(
      theStatus => {
        switch(theStatus){
          case 1: // Si les donnée recuperer ne sont pas vide
          return this.nativeStorage.get('users').then(
              users =>  {
                let isValided: boolean = false; // Init varaible - L'objectif est ce tester si l'email est deja dans l'array. Par default ont dit qu'il n'y est pas
                for(let i = 0; i < users.length; i++)
                  if(users[i].email === user.email) // Test si l'email est là
                    isValided = true // Ont enregistre dans la varible le fait qu'ont ai trouvé l'email de l'utilisateur dans le tableau d'utilisateur
                if(isValided)
                  return false;
                this._user = user;
                users.push(user) // Aujouter le nouvelle utilisateur dans le tableau d'utilisateur
                return true;
              }
            );
          case 0:
          case -1:
            return this.nativeStorage.set('users', [user]).then(
              data => {return true;}
            );
          default:
            return this.nativeStorage.set('users', [user]).then(
              data => {return true;}
            );
        }
      }
    )
  }

  loginUser(email:string, password:string){
    return this.checkedEmail(email).then( // Test si l'address email est enregister
      data => {
        if(data){ // Verification du resulta de la Promise 'checkedEmail'
           return this.nativeStorage.get('users').then( // Récuperation des utilisateur
            users => {
              console.log("-----------------")
              for(let i = 0; i < users.length; i++)
                if(users[i].email === email && users[i].password === password){ // Verification du password
                  this._user = users[i]; // Ajout du profile user dans la class UserProvider grace au setter. Grace a sa, nous pouvont recuperer le profile à tout moments vu qu'il est stocker dans la class UserProvider
                  return true;
                }
              return false;
            })
        }
        return false
      }
    )
  }

  updateUser( user:User, isEmail:any = { type: false}){
    return this.nativeStorage.get('users').then( // Récuperation des utilisateur
      users => {
        console.log("-----------------")
        for(let i = 0; i < users.length; i++){
          if(users[i].email === user.email){ // Verification du password
            this._user = user; // Ajout du profile user dans la class UserProvider grace au setter. Grace a sa, nous pouvont recuperer le profile à tout moments vu qu'il est stocker dans la class UserProvider
            users[i] = user
            this.nativeStorage.set('users', users)
            return true;
          }
          if(isEmail){
            if(users[i].email === isEmail.email){ // Verification du password
              this._user = user; // Ajout du profile user dans la class UserProvider grace au setter. Grace a sa, nous pouvont recuperer le profile à tout moments vu qu'il est stocker dans la class UserProvider
              users[i] = user
              this.nativeStorage.set('users', users)
              return true;
            }
          }
        }
        return false;
      })
  }
}
