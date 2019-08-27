import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { FormErrorStateMatcher } from 'src/app/core/handlers/form-error-state-matcher';
import { RegleService } from 'src/app/core/services/regle/regle.service';
import { MatDialog, MatTableDataSource, MatPaginator, MatDialogConfig } from '@angular/material';
import { AddRegleComponent } from './add-regle/add-regle.component';
import { EditRegleComponent } from './edit-regle/edit-regle.component';


@Component({
  selector: 'app-regle',
  templateUrl: './regle.component.html',
  styleUrls: ['./regle.component.scss'],
  providers: [NgbCarouselConfig]  // add NgbCarouselConfig to the component providers
})
export class RegleComponent implements OnInit {

  listRegle = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'nom', 'numOrdre', 'description', 'image', 'actions'];
  searchKey: string;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(private dialog: MatDialog,
              private regleService: RegleService,
              private changeDetectorRefs: ChangeDetectorRef) { }



  ngOnInit() {
    this.refresh();
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.listRegle.filter = this.searchKey.trim().toLowerCase();
  }

  onCreate() {
    const config = new MatDialogConfig();
    config.disableClose = true;
    config.autoFocus = true;
    config.width = '80%';
    this.dialog.open(AddRegleComponent, config)
      .afterClosed().subscribe(res => this.refresh());
  }

  refresh() {
    this.regleService.getRules().subscribe((res: any[]) => {
      this.listRegle.data = res;
      this.listRegle.paginator = this.paginator;
      this.changeDetectorRefs.detectChanges();
    });
  }

  onEdit(element) {
    console.log(element);
    const config = new MatDialogConfig();
    config.disableClose = true;
    config.autoFocus = true;
    config.width = '80%';
    config.data = element;
    this.dialog.open(EditRegleComponent, config)
      .afterClosed().subscribe(async res => {
        console.log('Close: ', res);
        await this.refresh();
      });
  }

  onDelete(id) { }

  createImagePath(serverPath: string) {
    // return `http://192.168.1.105:1020/${serverPath}`;
    return `http://localhost:4772/${serverPath}`;
  }

}
