import {AfterViewChecked, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {ImageService} from "../../services/image.service";
import {ToastService} from "../../services/toast.service";
import {Image} from "../../models/image";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'fcc-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent implements AfterViewChecked {

  @Input()
  images: Image[];

  @Input()
  showDelete: boolean = true;

  @ViewChild('grid')
  grid: ElementRef;

  constructor(private imageService: ImageService,
              private toastService: ToastService,
              public authService: AuthService) {
  }

  ngAfterViewChecked() {
    if (this.images && this.images.length > 0) {
      const masonry = new Masonry(this.grid.nativeElement, {
        itemSelector: '.grid-item',
        columnWidth: 200
      });
    }
  }

  deleteImage(imageId: string, index: number) {
    this.imageService.deleteImage(imageId).subscribe(
      response => {
        this.images.splice(index, 1);
        this.toastService.showToast('Image deleted successfully.');
      },
      error => this.toastService.showToast('Could not delete image.', true)
    )
  }

  likeImage(imageId: string, index: number) {
    this.imageService.likeImage(imageId).subscribe(
      response => {
        const image = this.images[index];
        if (image.liked) {
          this.images.splice(index, 1, {
            ...image,
            likes: image.likes - 1,
            liked: false
          });
        } else {
          this.images.splice(index, 1, {
            ...image,
            likes: image.likes + 1,
            liked: true
          });
        }
        this.toastService.showToast('Liked successfully');
      }, error => this.toastService.showToast('Could not like Image', true)
    )
  }

}
