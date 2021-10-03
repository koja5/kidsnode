import { NgModule } from '@angular/core';
import { DynamicModuleModule } from 'src/app/components/dynamic-component/dynamic-module/dynamic-module.module';
import { FoodMenuComponent } from '../food-menu/food-menu.component';
import { FoodComponent } from '../food/food.component';
import { ParametersComponent } from '../parameters/parameters.component';
import { TypeOfWorkComponent } from '../type-of-work/type-of-work.component';
import { WorkPlacesComponent } from '../work-places/work-places.component';
import { ParametersRouting } from './parameters-routing';

@NgModule({
  declarations: [
    WorkPlacesComponent,
    ParametersComponent,
    TypeOfWorkComponent,
    FoodComponent,
    FoodMenuComponent
  ],
  imports: [ParametersRouting, DynamicModuleModule],
  providers: [],
})
export class ParametersModule {}
