import { Component, OnInit } from '@angular/core';
import { RegleService } from 'src/app/core/services/regle/regle.service';

@Component({
  selector: 'app-list-regle',
  templateUrl: './list-regle.component.html',
  styleUrls: ['./list-regle.component.scss']
})
export class ListRegleComponent implements OnInit {

  // images = [1, 2, 3].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);
  imageServer;
  imageToShow = [];
  constructor(private regleService: RegleService) { }

  ngOnInit() {
    this.regleService.getRules().subscribe((res: any[]) => {
      for (let i = 0; i < res.length; i++) {
        if (res[i].show) {
          this.imageToShow.push(res[i]);
        }
      }
      this.imageServer = res
    });
  }

  createImagePath(serverPath: string) {
    return `http://localhost:4772/${serverPath}`;
  }

}
