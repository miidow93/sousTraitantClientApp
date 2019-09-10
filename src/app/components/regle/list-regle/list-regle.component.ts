import { Component, OnInit } from '@angular/core';
import { RegleService } from 'src/app/core/services/regle/regle.service';
import { constants } from 'src/app/shared/constants';

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
    this.refresh();
  }

  createImagePath(serverPath: string) {
    return `${constants.serverImg}${serverPath}`;
    // return `http://localhost:4772/${serverPath}`;
  }

  refresh() {
    this.regleService.getRules().subscribe((res: any[]) => {
      for (let i = 0; i < res.length; i++) {
        if (res[i].show) {
          // console.log('Image push', res[i].nom);
          this.imageToShow.push(res[i]);
        }
      }
      this.imageServer = res;
    });
  }

}
