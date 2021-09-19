import { NgModule } from '@angular/core';
import { DynamicModuleModule } from 'src/app/components/dynamic-component/dynamic-module/dynamic-module.module';
import { AllEmployeeComponent } from '../all-employee/all-employee.component';
import { EmployeeComponent } from '../employee/employee.component';
import { EmployeeRouting } from './employee-routing';

@NgModule({
  declarations: [
    AllEmployeeComponent,
    EmployeeComponent
  ],
  imports: [EmployeeRouting, DynamicModuleModule],
  providers: [],
})
export class EmployeeModule {}
