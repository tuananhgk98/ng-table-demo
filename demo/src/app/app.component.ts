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

  selectionOne = new SelectionModel<IPartData>(true, []);
  selectionTwo = new SelectionModel<IPartData>(true, []);

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

  isAllSelectedOne() {
    const numSelected = this.selectionOne.selected.length;
    const numRows = this.dataSourceOne.data.length;
    return numSelected === numRows;
  }

  masterToggleOne() {
    if (this.isAllSelectedOne()) {
      this.selectionOne.clear();
      return;
    }

    this.selectionOne.select(...(this.dataSourceOne.data as IPartData[]));
  }

  isAllSelectedTwo() {
    const numSelected = this.selectionTwo.selected.length;
    const numRows = this.dataSourceTwo.data.length;
    return numSelected === numRows;
  }

  masterToggleTwo() {
    if (this.isAllSelectedTwo()) {
      this.selectionTwo.clear();
      return;
    }

    this.selectionTwo.select(...(this.dataSourceTwo.data as IPartData[]));
  }

  deleteItem(index: number) {
    this.dataSourceOne.data.unshift(this.dataSourceTwo.data[index]);
    this.dataSourceTwo.data.splice(index, 1);
    this.selectionOne.clear();
    this.dataSourceOne._updateChangeSubscription();
    this.dataSourceTwo._updateChangeSubscription();
  }

  move() {
    this.selectionOne['_selected'].forEach((item: IPartData) => {
      const index = this.dataSourceOne.data.findIndex(
        (i: any) => i.partCode === item.partCode
      );
      this.dataSourceOne.data.splice(index, 1);
      this.dataSourceOne._updateChangeSubscription();
    });
    this.dataSourceTwo.data = [...this.selectionOne['_selected']];
    this.dataSourceTwo._updateChangeSubscription();
    this.selectionOne.clear();
  }
}
