import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FoodMenuComponent } from '../food-menu/food-menu.component';
import { FoodComponent } from '../food/food.component';
import { GeneralContractsComponent } from '../general-contracts/general-contracts.component';
import { SuppliersCompanyComponent } from '../suppliers-company/suppliers-company.component';
import { TypeOfWorkComponent } from '../type-of-work/type-of-work.component';
import { WorkPlacesComponent } from '../work-places/work-places.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'work-places',
    pathMatch: 'full',
  },
  {
    path: 'work-places',
    component: WorkPlacesComponent
  },
  {
    path: 'type-of-work',
    component: TypeOfWorkComponent
  },
  {
    path: 'food',
    component: FoodComponent
  },
  {
    path: 'food-menu',
    component: FoodMenuComponent
  },
  {
    path: 'general-contracts',
    component: GeneralContractsComponent
  },
  {
    path: 'suppliers-company',
    component: SuppliersCompanyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParametersRouting {}
