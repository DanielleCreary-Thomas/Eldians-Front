import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';




@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  

  mainForm = new FormGroup({
    banner: new FormControl(''),
    logout: new FormControl(''),
    account: new FormControl(''),
    marketplace: new FormControl(''),
    history: new FormControl(''),
    admin: new FormControl('')
  });

  constructor( private router: Router,public dataService: DataService) { }

  constructLogoutLine(){
    var line:String ="";
    var name = this.dataService.encodeUsername(this.dataService.loggedInUser);
    var type = this.dataService.getUser()['type'];
    var amount = this.dataService.encodeAmount("0")
    line += "10 " + name+" "+type+" "+amount
    this.dataService.dailyFileContents.push(line);
  }

  logout():void {
    this.constructLogoutLine();
    this.router.navigate(['']);
    console.log(this.dataService.dailyFileContents)
  }

  



  ngOnInit(): void {
  }

}
