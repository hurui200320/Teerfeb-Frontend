import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {
  menuItems: MenuItem[] = [
    {icon: 'pi pi-home', label: '主页', routerLink: '/'},
    {icon: 'pi pi-desktop', label: 'Xray/CT预测新冠', routerLink: '/xray'},
    {icon: 'pi pi-search', label: '生理指标预测糖尿病', routerLink: '/diabetes'},
    {icon: 'pi pi-pencil', label: '新冠疫情数据可视化', routerLink: '/view'}
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
