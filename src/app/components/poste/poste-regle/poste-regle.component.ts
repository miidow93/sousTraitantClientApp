import { Component, OnInit } from '@angular/core';
import { RegleService } from 'src/app/core/services/regle/regle.service';
@Component({
  selector: 'app-poste-regle',
  templateUrl: './poste-regle.component.html',
  styleUrls: ['./poste-regle.component.scss']
})
export class PosteRegleComponent implements OnInit {

  imageServer;
  imageLength=0;
  imageToShow = [];
  
  constructor(private regleService: RegleService) { }

  ngOnInit() {
    this.regleService.getRules().subscribe((res: any[]) => {
      for (let i = 0; i < res.length; i++) {
        if (res[i].show) {
          this.imageToShow.push(res[i]);
          this.imageLength++;
        }
      }
      this.imageServer = res;
      console.log(this.imageLength);
    });
  }

  createImagePath(serverPath: string) {
    return `http://localhost:4772/${serverPath}`;
  }
}
