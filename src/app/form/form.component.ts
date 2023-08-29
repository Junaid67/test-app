import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ModalDialogComponent } from '../modal-dialog/modal-dialog.component';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  inputVal = new FormControl('', [Validators.required]);
  
  constructor(public dialog: MatDialog, private appService:AppService){}

  getErrorMessage() {
    if (this.inputVal.hasError('required')) {
      return 'You must enter a value';
    }
    return;
  }
  
  onSubmit(){
    let value = this.inputVal.value;

    this.appService.fetchResult({searchValue: value}).subscribe((res: any)=>{
      this.dialog.open(ModalDialogComponent, {
        data: res,
        width: '720px',
        panelClass: 'custom-dialog-container-org',
      });
    })
      
    // this.appService.data$.subscribe((res:any)=>{
    //     this.dialog.open(ModalDialogComponent, {
    //       data: res,
    //       width: '720px',
    //       panelClass: 'custom-dialog-container-org',
    //     });
    // }).unsubscribe();

  }
}
