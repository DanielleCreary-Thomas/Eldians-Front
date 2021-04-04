import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import {DomSanitizer} from '@angular/platform-browser';


@Component({
  selector: 'app-loading-page',
  templateUrl: './loading-page.component.html',
  styleUrls: ['./loading-page.component.css']
})
export class LoadingPageComponent implements OnInit {

  loadingPage = new FormGroup({
  })

  gameFile = null;
  userFile = null;
  marketFile = null;
  fileToUpload = null;
  download = null;

  constructor(private dataService: DataService,private sanitizer:DomSanitizer) { }

  ngOnInit(): void {
  }

  // handleFileInput(gamesfile: File) {
  //   this.gameFile = gamesfile;
  // }
  handleGameInput(files: FileList) {
    this.fileToUpload = files.item(0);
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.gameFile = fileReader.result
      this.dataService.gamesData = this.gameFile;
      this.download = this.sanitizer.bypassSecurityTrustUrl('data:text/plain;base64,' + btoa(this.gameFile));
    }
    fileReader.readAsText(this.fileToUpload);
} 

handleUserInput(files: FileList) {
  this.fileToUpload = files.item(0);
  let fileReader = new FileReader();
  fileReader.onload = (e) => {
    this.userFile = fileReader.result
    this.dataService.usersData = this.userFile;
  }
  fileReader.readAsText(this.fileToUpload);
} 

handleMarketInput(files: FileList) {
  this.fileToUpload = files.item(0);
  let fileReader = new FileReader();
  fileReader.onload = (e) => {
    this.marketFile = fileReader.result
    this.dataService.marketsData = this.marketFile;
  }
  fileReader.readAsText(this.fileToUpload);
} 

sanitize(url:string){
  return this.sanitizer.bypassSecurityTrustUrl(url);
}


// test(){
//   var test1 = JSON.parse(this.gameFile);
//   var test2 = JSON.parse(this.userFile);
//   var test3 = JSON.parse(this.marketFile);
//   console.warn(test1[0].name)
//   console.warn(test2)
//   console.warn(test3)
// }



}
