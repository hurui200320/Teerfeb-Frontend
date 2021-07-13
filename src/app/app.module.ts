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
import {AlertComponent} from './pages/alert/alert.component';
import {ViewComponent} from './pages/view/view.component';
import {FileUploadModule} from "primeng/fileupload";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    NaviComponent,
    FooterComponent,
    HomeComponent,
    XrayComponent,
    AlertComponent,
    ViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MenubarModule,
    RippleModule,
    FileUploadModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
