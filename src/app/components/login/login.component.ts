import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl(''),
    // password: new FormControl(''),
  });
  userTypes = [
    {value: 'AA', viewValue: 'Admin'},
    {value: 'FS', viewValue: 'FullStandard'},
    {value: 'BS', viewValue: 'BuyStandard'},
    {value: 'SS', viewValue: 'SellStandard'}
  ];
  constructor(private router: Router,private route: ActivatedRoute, private dataService: DataService,private sanitizer:DomSanitizer,private _snackBar: MatSnackBar) { }

 
  gameFile = null;
  userFile = null;
  marketFile = null;
  fileToUpload = null;
  download = null;
  isValidUser = true;

  ngOnInit(): void {
  }

  constructLoginLine(){
    var line:String ="";
    var name = this.dataService.encodeUsername(this.dataService.loggedInUser);
    var type = this.dataService.getUser()['type'];
    var amount = this.dataService.encodeAmount("0")
    line += "00 " + name+" "+type+" "+amount
    this.dataService.dailyFileContents.push(line);
  }


  verifyUsername(){
    return !(this.loginForm.value.username == this.dataService.getUser().username)
  }
  getNameErrorMessage(){
    return 'User does not exist'
  }
  // verifyPassword(){
  //   return !(this.loginForm.value.password == this.dataService.getUser().password)
  // }
  // getPassErrorMessage(){
  //   return 'Password does not match'
  // }
  login():void{
    if (this.dataService.authenticateUser(this.loginForm.value.username)){
      this.dataService.loggedInUser = this.loginForm.value.username
      this.constructLoginLine();
      this.router.navigate(['main']);
      console.log(this.dataService.getSellers())
      console.log(this.dataService.getGamesForSeller("Danielle"))
    }
    else{
      this.dataService.showMessage('Invalid Login Credentials.')
      this.loginForm.controls['username'].reset();
      this.loginForm.controls['password'].reset();
    }

  }

  handleGameInput(files: FileList) {
    this.fileToUpload = files.item(0);
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.gameFile = fileReader.result
      this.dataService.gamesData = JSON.parse(this.gameFile);
      this.download = this.sanitizer.bypassSecurityTrustUrl('data:text/plain;base64,' + btoa(this.gameFile));
    }
    fileReader.readAsText(this.fileToUpload);
} 

handleUserInput(files: FileList) {
  this.fileToUpload = files.item(0);
  let fileReader = new FileReader();
  fileReader.onload = (e) => {
    this.userFile = fileReader.result
    this.dataService.usersData = JSON.parse(this.userFile);
  }
  fileReader.readAsText(this.fileToUpload);
} 

handleMarketInput(files: FileList) {
  this.fileToUpload = files.item(0);
  let fileReader = new FileReader();
  fileReader.onload = (e) => {
    this.marketFile = fileReader.result
    this.dataService.marketsData = JSON.parse(this.marketFile);
  }
  fileReader.readAsText(this.fileToUpload);
} 

isLoginEnabled(){
  return !(this.dataService.usersData && this.dataService.gamesData && this.dataService.marketsData);
}
downloadDaily(){
this.downLoadFile(this.dataService.getFileContentsAsString(),'text/plain');
this.dataService.dailyFileContents = [];
}

downLoadFile(data: any, type: string) {
  const fileName = 'daily.txt';
  const a = document.createElement('a'); document.body.appendChild(a);
  const blob = new Blob([data], {type: type});
  const url = window.URL.createObjectURL(blob);
  a.href = url;
  a.download = fileName;
  a.click();
  window.URL.revokeObjectURL(url);

}

sanitize(url:string){
  return this.sanitizer.bypassSecurityTrustUrl(url);
}

}
