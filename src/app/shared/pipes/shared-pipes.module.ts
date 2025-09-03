import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExcerptPipe } from './excerpt.pipe';
import { GetValueByKeyPipe } from './get-value-by-key.pipe';
import { RelativeTimePipe } from './relative-time.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ExcerptPipe,
    GetValueByKeyPipe,
    RelativeTimePipe
  ],
  exports: [
    ExcerptPipe,
    GetValueByKeyPipe,
    RelativeTimePipe
  ]
})
export class SharedPipesModule { }
