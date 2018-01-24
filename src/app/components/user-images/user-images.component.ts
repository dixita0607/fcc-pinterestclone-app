import {Component, OnInit} from '@angular/core';
import {Image} from "../../models/image";
import {UserService} from "../../services/user.service";
import {AuthService} from "../../services/auth.service";
import {ToastService} from "../../services/toast.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'fcc-user-images',
  templateUrl: './user-images.component.html',
  styleUrls: ['./user-images.component.scss']
})
export class UserImagesComponent implements OnInit {

  images: Image[];

  constructor(private userService: UserService,
              private authService: AuthService,
              private toastService: ToastService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.getUserImages();
  }

  getUserImages() {
    this.userService.getUserImages(this.activatedRoute.snapshot.params.username).subscribe(
      (images: Image[]) => this.images = images,
      error => this.toastService.showToast('Could not fetch images')
    )
  }

}
