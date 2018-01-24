import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'fcc-image-with-fallback',
  templateUrl: './image-with-fallback.component.html',
  styleUrls: ['./image-with-fallback.component.scss']
})
export class ImageWithFallbackComponent implements OnInit {

  @ViewChild('imageContainer')
  imageContainer: ElementRef;

  @Input()
  imageUrl: string;

  constructor() {
  }

  ngOnInit() {
    if (this.imageUrl) {
      const img = new Image(200);
      img.alt = 'Image';
      img.onload = () => {
        this.imageContainer.nativeElement.appendChild(img);
      };
      img.onerror = () => {
        img.src = '../../../assets/images/placeholderImage.png';
      };
      img.src = this.imageUrl;
    }
  }

}
