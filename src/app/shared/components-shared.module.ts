import { AppMaterialModule } from './app-material/app-material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { CategoryPipe } from './pipes/category.pipe';
import { ComfirmationDialogComponent } from './components/comfirmation-dialog/comfirmation-dialog.component'


@NgModule({
  declarations: [
    ErrorDialogComponent,
    CategoryPipe,
    ComfirmationDialogComponent
  ],
  imports: [
    CommonModule,
    AppMaterialModule
  ],
  exports:[
    ErrorDialogComponent,
    CategoryPipe,
    ComfirmationDialogComponent
  ]
})
export class SharedModule { }
