import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.css']
})
export class MarketplaceComponent implements OnInit {

  marketplaceForm = new FormGroup({
    buySeller: new FormControl(''),
    buyGame: new FormControl(''),
    sellGame: new FormControl(''),
    sellPrice: new FormControl(''),
    sellDiscount: new FormControl('')
  })

  constructor(public dataService: DataService) { }


  ngOnInit(): void {
    //this.onChanges();
  }

  // test(){
  //   console.log(this.marketplaceForm)
  // }

  // onChanges(){
  //   this.marketplaceForm.valueChanges.subscribe(val => {
  //     this.test()
  //     // this.discountEnabler()
  //     // this.sellEnabler()
  //   });
  // }

  // sellEnabler(){
  //   if((this.marketplaceForm.value.sellGame) != ''){
  //     this.marketplaceForm.controls['sellPrice'].enable();
  //     this.marketplaceForm.controls['sellDiscount'].enable();
  //   }
  // }

  // discountEnabler(){
  //   if((this.marketplaceForm.value.sellPrice) != ''){
  //     this.marketplaceForm.controls['sellDiscount'].enable();
  //   }
  // }

  constructBuyLine(){
    var line:String="";
    var seller = this.dataService.encodeUsername(this.marketplaceForm.value.buySeller)
    var game = this.dataService.encodeGamename(this.marketplaceForm.value.buyGame['name'])
    var buyer = this.dataService.encodeUsername(this.dataService.loggedInUser)
    if(seller != "" && game != "" && buyer != ""){
      line += "04 "+game +" " +seller+ " "+ buyer
      this.dataService.dailyFileContents.push(line);
    }else{
      this.dataService.showMessage("Invalid Entry, Please Try Again.")
    }
    this.marketplaceForm.controls['buySeller'].reset()
    this.marketplaceForm.controls['buyGame'].reset()
  }

  constructSellLine(){
    var line:String=""
    var name = this.dataService.encodeGamename(this.marketplaceForm.value.sellGame)
    var seller = this.dataService.encodeUsername(this.dataService.loggedInUser)
    var discount = this.dataService.encodeDiscount(this.marketplaceForm.value.sellDiscount)
    var sellprice = this.marketplaceForm.value.sellPrice.includes('.')?this.marketplaceForm.value.sellPrice:this.marketplaceForm.value.sellPrice+'.00';
    var price = this.dataService.encodePrice(sellprice)

    if(name != "" && seller != "" && discount != "" && price != ""){
      line+="03 "+name+" "+seller+" "+discount+" "+price
      this.dataService.dailyFileContents.push(line);
    }else{
      this.dataService.showMessage("Invalid Entry, Please Try Again.")
    }
    this.marketplaceForm.controls['sellGame'].reset()
    this.marketplaceForm.controls['sellDiscount'].reset()
    this.marketplaceForm.controls['sellPrice'].reset()
  }
}
