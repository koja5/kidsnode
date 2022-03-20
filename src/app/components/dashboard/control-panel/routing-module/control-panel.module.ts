import { NgModule } from '@angular/core';
import { DynamicControlPanelModule } from 'src/app/components/dynamic-component/dynamic-control-panel/dynamic-control-panel.module';
import { ControlPanelOwnerComponent } from '../control-panel-items/control-panel-childrens/control-panel-owner.component';
import { ControlPanelComponent } from '../control-panel/control-panel.component';
import { ControlPanelRouting } from './control-panel-routing';

@NgModule({
  declarations: [ControlPanelComponent, ControlPanelOwnerComponent],
  imports: [ControlPanelRouting, DynamicControlPanelModule],
  providers: [],
})
export class ControlPanelModule {}
