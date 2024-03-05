import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CanActivateGuard } from './@shared/guards/can-activate';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./@app/auth/auth.module').then((m) => m.AuthPageModule)
  },
  {
    path: 'home',
    canActivate: [CanActivateGuard],
    loadChildren: () =>
      import('./@app/home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'contacts',
    canActivate: [CanActivateGuard],
    loadChildren: () =>
      import('./@app/contacts/contacts.module').then(
        (m) => m.ContactsPageModule
      ),
  },
  {
    path: 'sales',
    canActivate: [CanActivateGuard],
    loadChildren: () => import('./@app/sales/sales.module').then( m => m.SalesPageModule)
  },
  {
    path: 'hr',
    canActivate: [CanActivateGuard],
    loadChildren: () => import('./@app/hr/hr-home.page.module').then( m => m.HrPageModule)
  },
  {
    path: 'programs',
    canActivate: [CanActivateGuard],
    loadChildren: () => import('./@app/programs/programs.module').then( m => m.ProgramsPageModule)
  },
  {
    path: 'tasks',
    loadChildren: () => import('./@app/tasks/tasks.module').then( m => m.TasksPageModule)
  },




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
