import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { LoadingPageComponent } from './components/loading-page/loading-page.component';


const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'landing', component: LoadingPageComponent },
  { path: 'main',        component: MainComponent },
  { path: '**', component: MainComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
