import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

export interface IPartData {
  partName: string;
  partNumber: string;
  partCode: string;
}

const EXAMPLE_DATA: IPartData[] = [
  {
    partName: '0001',
    partNumber: '1112',
    partCode: '2223',
  },
  {
    partName: '0002',
    partNumber: '1113',
    partCode: '2224',
  },
  {
    partName: '0003',
    partNumber: '1114',
    partCode: '2225',
  },
  {
    partName: '0004',
    partNumber: '1115',
    partCode: '2226',
  },
  {
    partName: '0005',
    partNumber: '1116',
    partCode: '2227',
  },
];
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'demo';
  dataSourceOne = new MatTableDataSource();
  dataSourceTwo = new MatTableDataSource();

  selection = new SelectionModel<IPartData>(true, []);
  displayedColumnsOne = ['select', 'partName', 'partNumber', 'partCode'];
  displayedColumnsTwo = [
    'select',
    'partName',
    'partNumber',
    'partCode',
    'delete',
  ];

  constructor() {}

  ngOnInit(): void {
    this.dataSourceOne.data = EXAMPLE_DATA;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSourceOne.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...(this.dataSourceOne.data as IPartData[]));
  }

  deleteItem(index: number) {
    this.dataSourceTwo.data.splice(index, 1);
    this.dataSourceTwo._updateChangeSubscription();
  }

  move() {
    this.dataSourceTwo.data = this.selection['_selected'];
    this.dataSourceTwo._updateChangeSubscription();
  }
}
