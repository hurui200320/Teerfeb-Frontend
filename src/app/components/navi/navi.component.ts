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
    {icon: 'pi pi-desktop', label: 'Xray/CT', routerLink: '/xray'},
    {icon: 'pi pi-exclamation-triangle', label: '并发症预警', routerLink: '/alert'},
    {icon: 'pi pi-pencil', label: '数据可视化', routerLink: '/view'}
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
