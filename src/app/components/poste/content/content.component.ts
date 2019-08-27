import { Component, OnInit } from '@angular/core';
import { VisiteurService } from 'src/app/core/services/visiteur/visiteur.service';
import { MatTableDataSource, MatAutocomplete } from '@angular/material';
import { FormGroup, FormBuilder, NgForm, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Societe } from 'src/app/shared/models/societe';
import { SocieteService } from 'src/app/core/services/societe/societe.service';


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  posteForm: FormGroup;
  id: 0;
  nomComplet: '';
  cinCnss: '';
  personneService: '';
  telephone: '';
  numBadge: 0;
  // tslint:disable-next-line:max-line-length
  displayedColumns: string[] = ['nomComplet', 'cinCnss', 'personneService', 'heureEntree', 'heureSortie', 'telephone', 'Societe', 'numBadge', 'actions'];
  datasource;

  societes = [];
  filteredSocietes: Observable<any[]>;
  societeControl = new FormControl();
  constructor(private servSociete:SocieteService, private formBuilder: FormBuilder, private service: VisiteurService, private router: Router) { }

  ngOnInit() {
    this.filterInitSociete();
    this.showConfig();
    this.showSociete();
    this.posteForm = this.formBuilder.group({
      Societe:this.societeControl,

      nomComplet: [null, [Validators.required]],
      cinCnss: [null, [Validators.required]],
      personneService: [null, [Validators.required]],
      // 'heureEntree': [null, [Validators.required]],
      // 'heureSortie': [null, [Validators.required]],
      // 'dateVisite': [null, [Validators.required]],
      telephone: [null, [Validators.required]],
      numBadge: [null],
    });
  }
  resetform() {
    this.posteForm.reset();
  }
  showConfig() {
    this.service.getVisitorsToday()
      .subscribe((data: any[]) => {
        this.datasource = new MatTableDataSource(data);
      });
  }

  showSociete(){
    this.servSociete.getSocietes()
    .subscribe((data: any[]) => {
      console.log(data);
      this.societes = data;
    });
  }

  onFormSubmit(form: NgForm) {
    this.service.addVisitor(form).subscribe(res => {
      this.resetform();
      this.showConfig();

      console.log(form);
    },
      err => console.log('error'));

    this.router.navigate(['poste/regle']);
  }

  private filterInitSociete() {
    this.filteredSocietes = this.societeControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filterSociete(value))
    );
  }

  private _filterSociete(value: string): any[] {
    const filterValue = value!= null ? value.toLowerCase():"";
    return this.societes.filter(e => e.nomSociete.toLowerCase().includes(filterValue));
  }

  OnSortie(id) {
    if (confirm('Validez la sortie ?')) {
      console.log('Sortie ID: ', id);
      this.service.SortieVisiteur(id).subscribe(res => {
        this.showConfig();
        console.log('Sortie Ok', res);
      },
        err => console.log(err));
    }
  }

}
