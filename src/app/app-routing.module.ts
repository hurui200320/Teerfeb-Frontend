import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {XrayComponent} from "./pages/xray/xray.component";
import {ViewComponent} from "./pages/view/view.component";
import {DiabetesComponent} from "./pages/diabetes/diabetes.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'xray', component: XrayComponent},
  {path: 'diabetes', component: DiabetesComponent},
  {path: 'view', component: ViewComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
