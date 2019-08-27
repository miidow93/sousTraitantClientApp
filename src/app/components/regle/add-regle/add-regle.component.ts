import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormErrorStateMatcher } from 'src/app/core/handlers/form-error-state-matcher';
import { RegleService } from 'src/app/core/services/regle/regle.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-add-regle',
  templateUrl: './add-regle.component.html',
  styleUrls: ['./add-regle.component.scss']
})
export class AddRegleComponent implements OnInit {

  regleForm: FormGroup;
  fileToUpload;
  matcher = new FormErrorStateMatcher();
  isLoadingResults = false;
  fileData: File = null;
  previewUrl: any = null;

  constructor(private formBuilder: FormBuilder, private regleService: RegleService, private dialogRef: MatDialogRef<AddRegleComponent>) { }

  ngOnInit() {
    this.regleForm = this.formBuilder.group({
      numOrdre: [null, [Validators.required, Validators.min(1)]],
      nom: [null, [Validators.required]],
      description: [null, [Validators.required]],
      // file: [null, Validators.required],
      show: [null, [Validators.required]]
    });
  }

  onFormSubmit(form) {
    console.log(form.value);
    const data = {
      numOrdre: form.value.numOrdre,
      nom: form.value.nom,
      description: form.value.description,
      image: this.previewUrl,
      show: (form.value.show) ? 1 : 0
    };

    this.regleService.addRule(data).subscribe(res => console.log(res));
    this.regleForm.reset();
    this.dialogRef.close();
    // console.log('FileToUpload: ', this.previewUrl);
    // this.http.post('http://localhost:4772/api/upload/', formData).subscribe(res => console.log(res));
    
  }

  public upload(event: any): void {
    this.fileData = event.target.files[0];
    this.preview();
  }

  preview() {
    // Show preview 
    const mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (event) => {
      this.previewUrl = reader.result;
      console.log('Result: ', reader.result);
      console.log('Reader: ', this.previewUrl);
    };
  }

}
