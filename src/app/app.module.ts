import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {ImageService} from "./services/image.service";
import {HomeComponent} from './components/home/home.component';
import {HttpClientModule} from "@angular/common/http";
import {AuthService} from "./services/auth.service";
import {UserService} from "./services/user.service";
import {ToastComponent} from './components/toast/toast.component';
import {ToastService} from "./services/toast.service";
import {ImagesComponent} from './components/images/images.component';
import {MenuComponent} from './components/menu/menu.component';
import {UserImagesComponent} from './components/user-images/user-images.component';
import {AddImageComponent} from './components/add-image/add-image.component';
import {ReactiveFormsModule} from "@angular/forms";
import {ImageWithFallbackComponent} from './components/image-with-fallback/image-with-fallback.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ToastComponent,
    ImagesComponent,
    MenuComponent,
    UserImagesComponent,
    AddImageComponent,
    ImageWithFallbackComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    AuthService,
    UserService,
    ImageService,
    ToastService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
