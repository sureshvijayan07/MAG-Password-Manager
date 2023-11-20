import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PasswordManagerService } from '../password-manager.service';
import { Observable } from 'rxjs';

import { AES, enc } from 'crypto-js';

@Component({
  selector: 'app-password-list',
  templateUrl: './password-list.component.html',
  styleUrls: ['./password-list.component.css'],
})
export class PasswordListComponent {
  siteID!: string;
  siteName!: string;
  siteURL!: string;
  siteImgURL!: string;

  passwordlist!: Array<any>;

  email!: string;
  username!: string;
  password!: string;
  passwordId!: string;

  formState: string = 'Add New';

  isSuccess: boolean = false;
  successMessage!: string;

  constructor(
    private route: ActivatedRoute,
    private passwordManagerService: PasswordManagerService
  ) {
    this.route.queryParams.subscribe((val: any) => {
      this.siteID = val.id;
      this.siteName = val.siteName;
      this.siteURL = val.siteURL;
      this.siteImgURL = val.siteImgURL;
    });

    this.loadPasswords();
  }

  showAlert(message: string) {
    this.isSuccess = true;
    this.successMessage = message;
  }

  resetForm() {
    this.email = '';
    this.username = '';
    this.password = '';
    this.formState = 'Add New';
    this.passwordId = '';
  }

  onSubmit(values: any) {
    const encryptedPassword = this.encryptPassword(values.password);
    values.password = encryptedPassword;

    if (this.formState == 'Add New') {
      this.passwordManagerService
        .addPassword(values, this.siteID)
        .then(() => {
          this.showAlert('Data Saved Sucessfully');
          this.resetForm();
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (this.formState == 'Edit') {
      this.passwordManagerService
        .updatePassword(this.siteID, this.passwordId, values)
        .then(() => {
          this.showAlert('Data Updated Sucessfully');
          this.resetForm();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  loadPasswords() {
    this.passwordManagerService.loadPasswords(this.siteID).subscribe((val) => {
      this.passwordlist = val;
    });
  }

  editPassword(
    email: string,
    username: string,
    password: string,
    passwordId: string
  ) {
    this.email = email;
    this.username = username;
    this.password = password;
    this.passwordId = passwordId;

    this.formState = 'Edit';
  }

  deletePassword(passwordId: string) {
    this.passwordManagerService
      .deletePassword(this.siteID, passwordId)
      .then(() => {
        this.showAlert('Data Deleted Sucessfully');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  encryptPassword(password: string) {
    const secretKey = '3273BCABB7EF9E23EF9C1C59D3189';
    const encryptedPassword = AES.encrypt(password, secretKey).toString();
    console.log(encryptedPassword);
    return encryptedPassword;
  }

  decryptPassword(password: string) {
    const secretKey = '3273BCABB7EF9E23EF9C1C59D3189';
    const decPassword = AES.decrypt(password, secretKey).toString(enc.Utf8);
    return decPassword;
  }

  onDecrypt(password: string, index: number) {
    const decPassword = this.decryptPassword(password);
    this.passwordlist[index].password = decPassword;
  }
}
