import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ImageService} from "../../services/image.service";
import {ToastService} from "../../services/toast.service";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'fcc-add-image',
  templateUrl: './add-image.component.html',
  styleUrls: ['./add-image.component.scss']
})
export class AddImageComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder,
              private imageService: ImageService,
              private toastService: ToastService,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      url: '',
      description: ''
    });
  }

  addImage() {
    this.imageService.addImage(
      this.form.get('url').value,
      this.form.get('description').value
    ).subscribe(
      response => {
        this.toastService.showToast('Image added successfully.');
        this.router.navigate([this.authService.user.username, 'images']);
      },
      error => {
        if (error.status === 400) this.toastService.showToast('Already Added.');
        else this.toastService.showToast('Could not add Image');
      }
    )
  }

}
