import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NaviComponent} from './components/navi/navi.component';
import {FooterComponent} from './components/footer/footer.component';
import {MenubarModule} from "primeng/menubar";
import {RippleModule} from "primeng/ripple";
import {HomeComponent} from './pages/home/home.component';
import {XrayComponent} from './pages/xray/xray.component';
import {ViewComponent} from './pages/view/view.component';
import {FileUploadModule} from "primeng/fileupload";
import {HttpClientModule} from "@angular/common/http";
import { DiabetesComponent } from './pages/diabetes/diabetes.component';
import {InputTextModule} from "primeng/inputtext";
import {FormsModule} from "@angular/forms";
import {TabViewModule} from "primeng/tabview";
import {ListboxModule} from "primeng/listbox";

@NgModule({
  declarations: [
    AppComponent,
    NaviComponent,
    FooterComponent,
    HomeComponent,
    XrayComponent,
    ViewComponent,
    DiabetesComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MenubarModule,
        RippleModule,
        FileUploadModule,
        HttpClientModule,
        InputTextModule,
        FormsModule,
        TabViewModule,
        ListboxModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
