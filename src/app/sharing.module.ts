import { NgModule } from '@angular/core';
import { LoaderComponent } from './components/common/loader/loader.component';
import { SearchInputPipe } from './pipes/search-input.pipe';

@NgModule({
  declarations: [LoaderComponent, SearchInputPipe],
  imports: [],
  exports: [LoaderComponent, SearchInputPipe],
  providers: [],
  bootstrap: []
})
export class SharingModule {}
