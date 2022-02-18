import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { MultiSelectModule } from '@syncfusion/ej2-angular-dropdowns';
import { DynamicModuleModule } from 'src/app/components/dynamic-component/dynamic-module/dynamic-module.module';
import { FoodMenuComponent } from '../food-menu/food-menu.component';
import { FoodComponent } from '../food/food.component';
import { GeneralContractsComponent } from '../general-contracts/general-contracts.component';
import { InvoiceSuppliersComponent } from '../invoice-suppliers/invoice-suppliers.component';
import { ParametersComponent } from '../parameters/parameters.component';
import { SuppliersCompanyComponent } from '../suppliers-company/suppliers-company.component';
import { TypeOfWorkComponent } from '../type-of-work/type-of-work.component';
import { WorkPlacesComponent } from '../work-places/work-places.component';
import { ParametersRouting } from './parameters-routing';

@NgModule({
  declarations: [
    WorkPlacesComponent,
    ParametersComponent,
    TypeOfWorkComponent,
    FoodComponent,
    FoodMenuComponent,
    GeneralContractsComponent,
    SuppliersCompanyComponent,
    InvoiceSuppliersComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ParametersRouting,
    DynamicModuleModule,
    MultiSelectModule,
    DatePickerModule,
  ],
  providers: [],
})
export class ParametersModule {}
