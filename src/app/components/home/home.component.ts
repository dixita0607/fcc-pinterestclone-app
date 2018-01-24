import {Component, OnInit} from '@angular/core';
import {Image} from "../../models/image";
import {ImageService} from "../../services/image.service";
import {ToastService} from "../../services/toast.service";

@Component({
  selector: 'fcc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  images: Image[];

  constructor(private imageService: ImageService,
              private toastService: ToastService) {
  }

  ngOnInit() {
    this.getImages();
  }

  getImages() {
    this.imageService.getImages().subscribe(
      (images: Image[]) => this.images = images,
      error => this.toastService.showToast('Could not get images', true)
    )
  }

}
