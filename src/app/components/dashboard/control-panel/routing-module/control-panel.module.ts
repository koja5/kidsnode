import { NgModule } from '@angular/core';
import { DynamicControlPanelModule } from 'src/app/components/dynamic-component/dynamic-control-panel/dynamic-control-panel.module';
import { ControlPanelChildrensComponent } from '../control-panel-items/control-panel-childrens/control-panel-childrens.component';
import { ControlPanelComponent } from '../control-panel/control-panel.component';
import { ControlPanelRouting } from './control-panel-routing';

@NgModule({
  declarations: [ControlPanelComponent, ControlPanelChildrensComponent],
  imports: [ControlPanelRouting, DynamicControlPanelModule],
  providers: [],
})
export class ControlPanelModule {}
