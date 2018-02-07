import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as fromContainers from './containers';

@NgModule({
  imports: [CommonModule],
  exports: [...fromContainers.containers],
  declarations: [...fromContainers.containers],
  providers: [],
})
export class HomeModule {}
