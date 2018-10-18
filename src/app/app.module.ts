import { Camera } from '@ionic-native/camera';
import { StatusBar } from '@ionic-native/status-bar';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { NativeStorage } from '@ionic-native/native-storage';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { Util } from '../providers/util/util';
import { Items } from '../mocks/providers/items';
import { MessageMocks } from '../mocks/messageMocks';
import { HttpProvider } from '../providers/http/http';
import { UserProvider } from '../providers/user/user';

// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    Util,
    Items,
    Camera,
    StatusBar,
    UserProvider,
    HttpProvider,
    MessageMocks,
    SplashScreen,
    NativeStorage,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
