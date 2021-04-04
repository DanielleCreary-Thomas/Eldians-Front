import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {ThemePalette} from '@angular/material/core';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
  
})

export class AccountComponent implements OnInit {

  accountForm = new FormGroup({
    addCredit: new FormControl(''),
    inventory: new FormControl(''),
    giftGameName: new FormControl(''),
    giftRecipient: new FormControl(''),
    removeGameName: new FormControl(''),
  });


  
  tiles = this.dataService.getInventory()//this.dataService.usersData[this.dataService.loggedInUser].inventory

  rows = 1
  cols = 1
  invColor = "#8091cf"
  // // [
  // //   {text: 'GameOne', price: "5.01", discount: "20.00", cols: 1, rows: 1, color: '#7f83ad'},
  // //   {text: 'GameTwo', price: "5.02", discount: "20.00", cols: 1, rows: 1, color: '#a1a5cf'},
  // //   {text: 'GameThree', price: "5.03", discount: "20.00", cols: 1, rows: 1, color: '#bdc1f1'},
  // //   {text: 'GameFour', price: "5.04", discount: "20.00", cols: 1, rows: 1, color: '#DDBDF1'},
  // // ]
  
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';
  value = (this.dataService.getUser()['accountBalance']/999999.99) * 100;
  
  constructor(public dataService: DataService) { }


  ngOnInit(): void {
  }

  constructAddCreditLine(){
    var line:String ="";
    var name = this.dataService.encodeUsername(this.dataService.loggedInUser);
    var type = this.dataService.getUser()['type'];
    var amount = this.dataService.encodeAmount(this.accountForm.value.addCredit)
    if(name != "" && type.length == 2 && amount != ""){
      line += "06 " + name+" "+type+" "+amount
      this.dataService.dailyFileContents.push(line);
    }else{
          this.dataService.showMessage("Invalid Entry, Please Try Again.")
    }
    this.accountForm.controls['addCredit'].reset()
  }
  
  constructGiftLine(){
    var line:String ="";
    var gameName = this.dataService.encodeGamename(this.accountForm.value.giftGameName)
    var giver = this.dataService.encodeUsername(this.dataService.loggedInUser)
    var recipient = this.dataService.encodeUsername(this.accountForm.value.giftRecipient)
    if(gameName != "" && giver != "" && recipient != ""){
      line += "09 " + gameName+" "+giver+" "+recipient
      this.dataService.dailyFileContents.push(line);
    }else{
      this.dataService.showMessage("Invalid Entry, Please Try Again.")
    }
    
    this.accountForm.controls['giftGameName'].reset()
    this.accountForm.controls['giftRecipient'].reset()

  }
  constructRemoveLine(){
    var line:String ="";
    var gameName = this.dataService.encodeGamename(this.accountForm.value.removeGameName)
    var name = this.dataService.encodeUsername(this.dataService.loggedInUser)
    var blanks = this.dataService.encodeUsername(" ")
    if(gameName != "" && name != ""){
      line += "08 " + gameName+" "+name+" "+blanks
      this.dataService.dailyFileContents.push(line);
    }else{
      this.dataService.showMessage("Invalid Entry, Please Try Again.")
    }
    this.accountForm.controls['removeGameName'].reset()
  }

  test(){
    this.value = this.dataService.getUser()['accountBalance']/999999.99;
    console.log(this.dataService.getUser()['accountBalance']/999999.99)
  }

}