import { Component } from '@angular/core';
import { PasswordManagerService } from '../password-manager.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-site-list',
  templateUrl: './site-list.component.html',
  styleUrls: ['./site-list.component.css'],
})
export class SiteListComponent {
  siteName!: string;
  siteURL!: string;
  siteImgURL!: string;
  siteID!: string;
  allSites!: Observable<Array<any>>;

  formState: string = 'Add New';
  isSuccess: boolean = false;
  successMessage!: string;

  constructor(private passwordMangerService: PasswordManagerService) {
    this.loadSites();
  }

  onSubmit(values: object) {
    if (this.formState == 'Add New') {
      this.passwordMangerService
        .addSite(values)
        .then(() => {
          this.showAlert('Data Saved Sucessfully');
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (this.formState == 'Edit') {
      this.passwordMangerService
        .updateSite(this.siteID, values)
        .then(() => {
          this.showAlert('Data Edited Sucessfully');
        })
        .catch((err) => {
          console.log(console.log(err));
        });
    }
  }

  loadSites() {
    this.allSites = this.passwordMangerService.loadSites();
  }

  editSite(siteName: string, siteURL: string, siteImgURL: string, id: string) {
    this.siteName = siteName;
    this.siteURL = siteURL;
    this.siteImgURL = siteImgURL;
    this.siteID = id;
    this.formState = 'Edit';
    console.log(this.siteID);
  }

  deleteSite(id: string) {
    this.passwordMangerService
      .deleteSite(id)
      .then(() => {
        this.showAlert('Data Deleted Sucessfully');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  showAlert(message: string) {
    this.isSuccess = true;
    this.successMessage = message;
  }
}
