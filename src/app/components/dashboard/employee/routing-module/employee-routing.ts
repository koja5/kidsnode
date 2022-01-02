import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllEmployeeComponent } from '../all-employee/all-employee.component';
import { ProfileEmployeeComponent } from '../employee/profile-employee/profile-employee.component';
import { WorkDiaryComponent } from '../work-diary/work-diary.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'all-employees',
    pathMatch: 'full',
  },
  {
    path: 'all-employees',
    component: AllEmployeeComponent,
  },
  {
    path: 'profile-employee/:id',
    component: ProfileEmployeeComponent,
  },
  {
    path: 'work-diary',
    component: WorkDiaryComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeRouting {}
