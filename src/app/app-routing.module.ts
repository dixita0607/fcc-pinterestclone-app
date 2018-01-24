import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {UserImagesComponent} from "./components/user-images/user-images.component";
import {AddImageComponent} from "./components/add-image/add-image.component";
import {AuthGuard} from "./services/auth-guard.service";

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: ':username/images', component: UserImagesComponent},
  {path: 'addImage', component: AddImageComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
