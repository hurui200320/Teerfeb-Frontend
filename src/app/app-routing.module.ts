import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {XrayComponent} from "./pages/xray/xray.component";
import {AlertComponent} from "./pages/alert/alert.component";
import {ViewComponent} from "./pages/view/view.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'xray', component: XrayComponent},
  {path: 'alert', component: AlertComponent},
  {path: 'view', component: ViewComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
