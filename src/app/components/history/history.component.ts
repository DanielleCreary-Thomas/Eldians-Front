import { Component, OnInit, ViewChild} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {ThemePalette} from '@angular/material/core';
import { DataService } from 'src/app/services/data.service';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  displayedColumns: string[] = ['date'];
  animals = this.dataService.getUser()['transactionHistory']
  dataSource: MatTableDataSource<String>;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;


  historyForm = new FormGroup({
    transactionDay: new FormControl(''),
  })
  constructor(private dataService: DataService) {
    this.dataSource = new MatTableDataSource(this.animals);

   }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
  }

}




