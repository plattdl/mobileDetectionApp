import { Component } from '@angular/core';

import { RunPage} from '../run/run';
import { ResultsPage} from '../results/results';
import { SettingsPage} from '../settings/settings';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = RunPage;
  tab2Root: any = ResultsPage;
  tab3Root: any = SettingsPage;

  constructor() {

  }
}
