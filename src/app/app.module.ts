import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { RunPage } from '../pages/run/run';
import { SettingsPage } from '../pages/settings/settings';
import { ResultsPage } from '../pages/results/results';
import { TabsPage } from '../pages/tabs/tabs';
import { DataListPage } from "../pages/data-list/data-list";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TestService } from "../services/test.service";
import { DataDetailPage } from "../pages/data-detail/data-detail";
import { SentinelTwoService } from "../services/sentinelTwo.service";
@NgModule({
  declarations: [
    MyApp,
    RunPage,
    DataListPage,
    DataDetailPage,
    ResultsPage,
    SettingsPage,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    RunPage,
    DataListPage,
    DataDetailPage,
    ResultsPage,
    SettingsPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    TestService,
    SentinelTwoService,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
