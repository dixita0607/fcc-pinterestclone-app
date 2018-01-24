import {Component, ElementRef, Input, OnChanges, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'fcc-image-with-fallback',
  templateUrl: './image-with-fallback.component.html',
  styleUrls: ['./image-with-fallback.component.scss']
})
export class ImageWithFallbackComponent implements OnChanges {

  @ViewChild('imageContainer')
  imageContainer: ElementRef;

  @Input()
  imageUrl: string;

  @Input()
  imageWidth: number = 180;

  constructor() {
  }

  ngOnChanges() {
    if (this.imageUrl) {
      const img = new Image(this.imageWidth);
      img.alt = 'Image';
      img.onload = () => {
        const previousImage = this.imageContainer.nativeElement.querySelector('img');
        if (previousImage) this.imageContainer.nativeElement.removeChild(previousImage);
        this.imageContainer.nativeElement.appendChild(img);
      };
      img.onerror = () => {
        img.src = '../../../assets/images/placeholderImage.png';
      };
      img.src = this.imageUrl;
    }
  }

}
