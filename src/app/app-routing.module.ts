import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [

  {
    path:'hero',
    loadChildren: () => import('./heroes/heroes.module').then( m => m.HeroesModule),

  },
  {
    path: '',
    redirectTo: 'hero',
    pathMatch:'prefix',
  }

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
