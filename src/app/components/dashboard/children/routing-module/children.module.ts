import { NgModule } from '@angular/core';
import { ChildrenRouting } from './children-routing';
import { KindergardenGroupComponent } from '../kindergarden-group/kindergarden-group.component';
import { ChildrenComponent } from '../children/children.component';
import { KindergardenSubgroupComponent } from '../kindergarden-subgroup/kindergarden-subgroup.component';
import { AllChildrenComponent } from '../all-children/all-children.component';
import { DynamicModuleModule } from 'src/app/components/dynamic-component/dynamic-module/dynamic-module.module';

@NgModule({
  declarations: [
    KindergardenGroupComponent,
    ChildrenComponent,
    KindergardenSubgroupComponent,
    AllChildrenComponent
  ],
  imports: [ChildrenRouting, DynamicModuleModule],
  providers: [],
})
export class ChildrenModule {}
