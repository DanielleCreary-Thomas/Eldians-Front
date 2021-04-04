import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { DataService} from 'src/app/services/data.service';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})


export class AdminComponent implements OnInit {

  adminForm = new FormGroup({
    createUsername: new FormControl(''),
    createType: new FormControl(''),
    createBalance: new FormControl(''),
    deleteUsername: new FormControl(''),
    refundSeller: new FormControl(''),
    refundBuyer: new FormControl(''),
    refundAmount: new FormControl(''),
    auctionsaleToggle: new FormControl(''),
    addCreditUsername: new FormControl(''),
    addCreditAmount: new FormControl(''),
    removeGameName: new FormControl(''),
    removeUsername: new FormControl(''),
    giftGiver: new FormControl(''),
    giftRecipient: new FormControl(''),
    giftGameName: new FormControl(''),
  })


  constructor(public dataService: DataService,) { }

  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  ngOnInit() {
  }

  // onChange(){
  //   this.constructAuctionSaleLine()
  // }

  constructGiftLine(){
    var line:String ="";
    var gameName = this.dataService.encodeGamename(this.adminForm.value.giftGameName)
    var giver = this.dataService.encodeUsername(this.adminForm.value.giftGiver)
    var recipient = this.dataService.encodeUsername(this.adminForm.value.giftRecipient)
    if(gameName != "" && giver != "" && recipient != ""){
      line += "09 " + gameName+" "+giver+" "+recipient
      this.dataService.dailyFileContents.push(line);
    }else{
      this.dataService.showMessage("Invalid Entry, Please Try Again.")
    }
    this.adminForm.controls['giftGameName'].reset()
    this.adminForm.controls['giftGiver'].reset()
    this.adminForm.controls['giftRecipient'].reset()
  }
  constructRemoveLine(){
    var line:String ="";
    var gameName = this.dataService.encodeGamename(this.adminForm.value.removeGameName)
    var name = this.dataService.encodeUsername(this.adminForm.value.removeUsername)
    var blanks = this.dataService.encodeUsername(" ")
    if(gameName != "" && name != ""){
      line += "08 " + gameName+" "+name+" "+blanks
      this.dataService.dailyFileContents.push(line);
    }else{
      this.dataService.showMessage("Invalid Entry, Please Try Again.")
    }
    this.adminForm.controls['removeGameName'].reset()
    this.adminForm.controls['removeUsername'].reset()
  }

  constructCreateLine(){
    var line:String ="";
    var name = this.dataService.encodeUsername(this.adminForm.value.createUsername)
    var type = this.adminForm.value.createType
    var amount = this.dataService.encodeAmount(this.adminForm.value.createBalance)
    if(name != "" && type.length == 2 && amount != ""){
      line += "06 " + name+" "+type+" "+amount
      this.dataService.dailyFileContents.push(line);
    }else{
          this.dataService.showMessage("Invalid Entry, Please Try Again.")
    }
    this.adminForm.controls['createUsername'].reset()
    this.adminForm.controls['createType'].reset()
    this.adminForm.controls['createBalance'].reset()
  }

  constructDeleteLine(){
    var line:String ="";
    var name = this.dataService.encodeUsername(this.adminForm.value.deleteUsername)
    var amount = this.dataService.encodeAmount("0")
    if(name != ""){
    line += "02 " + name+" "+"  "+" "+amount
    this.dataService.dailyFileContents.push(line);
    }else{
      this.dataService.showMessage("Invalid Entry, Please Try Again.")
    }
    this.adminForm.controls['deleteUsername'].reset()
  }

  constructRefundLine(){
    var line:String ="";
    var buyer = this.dataService.encodeUsername(this.adminForm.value.refundBuyer)
    var seller = this.dataService.encodeUsername(this.adminForm.value.refundSeller)
    var amount = this.dataService.encodeAmount(this.adminForm.value.refundAmount)
    if(buyer != "" && seller != "" && amount != ""){
      line += "05 " + buyer+" "+seller+" "+amount
      this.dataService.dailyFileContents.push(line);
    }else{
      this.dataService.showMessage("Invalid Entry, Please Try Again.")
    }
    
    this.adminForm.controls['refundBuyer'].reset()
    this.adminForm.controls['refundSeller'].reset()
    this.adminForm.controls['refundAmount'].reset()

  }

  constructAddCreditLine(){
    var line:String ="";
    var user = this.dataService.getGivenUser(this.adminForm.value.addCreditUsername);
    if (user != null && user != undefined){
      var name = this.dataService.encodeUsername(this.adminForm.value.addCreditUsername);
      var type = user['type'];
      var amount = this.dataService.encodeAmount(this.adminForm.value.addCreditAmount)
      if(name != "" && type.length == 2 && amount != ""){
        line += "06 " + name+" "+type+" "+amount
        this.dataService.dailyFileContents.push(line);
      }else{
            this.dataService.showMessage("Invalid Entry, Please Try Again.")
      }
      this.adminForm.controls['addCreditUsername'].reset()
      this.adminForm.controls['addCreditAmount'].reset()
    }
    this.dataService.showMessage("User does not exist, Please Try Again.")
    
  }

  constructAuctionSaleLine(){
    var line:String ="";
    var name = this.dataService.encodeUsername(this.dataService.loggedInUser);
    var type = this.dataService.getUser()['type'];
    var amount = this.dataService.encodeAmount("0")
    line += "07 " + name+" "+type+" "+amount
    this.dataService.dailyFileContents.push(line);
  }
}
