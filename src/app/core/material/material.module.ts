import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatToolbarModule, MatIconModule, MatCardModule, MatMenuModule
  , MatFormFieldModule, MatProgressSpinnerModule, MatInputModule, MatTableModule,
  MatPaginatorModule, MatSortModule,
  MatSidenavModule, MatListModule, MatDatepickerModule,
   NativeDateModule, MatNativeDateModule, MatCheckboxModule,
    MatSelectModule, MatDialogModule, MatGridListModule, MatRadioModule  } from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';





@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSidenavModule,
    MatListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMomentDateModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDialogModule,
    MatGridListModule,
    MatRadioModule
  ],
  exports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSidenavModule,
    MatListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMomentDateModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDialogModule,
    MatGridListModule,
    MatRadioModule
  ]
})
export class MaterialModule { }
