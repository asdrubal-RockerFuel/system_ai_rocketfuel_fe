import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BtnLoadingComponent } from './btn-loading/btn-loading.component';
import { FeatherIconComponent } from './feather-icon/feather-icon.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { SharedPipesModule } from '../pipes/shared-pipes.module';
import { SearchModule } from './search/search.module';
import { SharedDirectivesModule } from '../directives/shared-directives.module';
import { LayoutsModule } from './layouts/layouts.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    LayoutsModule,
    SharedPipesModule,
    SharedDirectivesModule,
    SearchModule,
    NgbModule,
    BtnLoadingComponent,    // Import de standalone
    FeatherIconComponent
  ],
  exports: [
    BtnLoadingComponent,    // Export de standalone
    FeatherIconComponent,
    SharedDirectivesModule,
    SearchModule
  ]
})
export class SharedComponentsModule { }
