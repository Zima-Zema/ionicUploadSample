import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { FileTransfer, FileTransferObject, FileUploadOptions, FileTransferError, FileUploadResult } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { ImagePicker } from '@ionic-native/image-picker';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  response: string;
  flage: boolean;
  exce: string;
  body: string;
  httpStatus: number;
  target: string;
  source: string;
  code: number;
  uploadErr: string;
  uploadRes: string;
  public imgUrl: string = "";
  constructor(public navCtrl: NavController, private transfer: FileTransfer, private file: File, private imagePicker: ImagePicker) {

  }

  openPicker(){
    let options = {
      outputType: 0,
      quality: 100,

    }
    this.imagePicker.getPictures(options).then((results) => {
      this.imgUrl = results[0];
    });
  }

  upload(){
    const fileTransfer: FileTransferObject = this.transfer.create();
    let options: FileUploadOptions = {
      fileKey: 'file',
      fileName:`${new Date().getTime()}.jpg`,
      headers: {},
      httpMethod:"POST"
   }
    // Upload a file:
    this.flage = false;
    fileTransfer.upload(this.imgUrl,"http://fantasista.azurewebsites.net/upload/UploadFile",options).then((res:FileUploadResult)=>{
      this.flage = true;
      this.response = res.response;
    
      this.uploadRes = "success"
    },(err:FileTransferError)=>{
      this.code = err.code
      this.source = err.source
      this.target = err.target,
      this.httpStatus = err.http_status;
      this.body = err.body;
      this.exce = err.exception;
    }).catch(err=>{
      this.uploadErr = "error";
    })
    
  }

}
