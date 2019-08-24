import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatToolbarModule, MatIconModule, MatCardModule, MatMenuModule
  , MatFormFieldModule, MatProgressSpinnerModule, MatInputModule, MatTableModule, 
  MatPaginatorModule, MatSortModule, 
  MatSidenavModule, MatListModule, MatDatepickerModule,
   NativeDateModule, MatNativeDateModule, MatCheckboxModule, MatSelectModule  } from '@angular/material';
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
    MatSelectModule
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
    MatSelectModule
  ]
})
export class MaterialModule { }
