import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicModuleModule } from '../../dynamic-component/dynamic-module/dynamic-module.module';
import { CallApiService } from 'src/app/services/call-api.service';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [CallApiService ]
})
export class DashboardModuleModule { }
