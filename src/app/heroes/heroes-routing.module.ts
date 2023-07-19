import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { UpdateComponent } from './update/update.component';
const routes: Routes = [

  {
    path:'',
    children:[
      {path: 'create', component: CreateComponent},
      {path: 'list', component: ListComponent},
      {path: 'update/:id', component: UpdateComponent},
      {path: '**', redirectTo: 'list'},
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeroesRoutingModule { }
