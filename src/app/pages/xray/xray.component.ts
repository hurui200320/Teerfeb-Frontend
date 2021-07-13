import {Component, OnInit} from '@angular/core';
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {MessageService} from "primeng/api";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-xray',
  templateUrl: './xray.component.html',
  styleUrls: ['./xray.component.css']
})
export class XrayComponent implements OnInit {
  apiUrl: string = `${environment.backendUrl}/xray`;
  result: { covid: number, normal: number, viral: number, image: string } | null = null;
  imageUrl: SafeUrl = {};

  constructor(
    private messageService: MessageService,
    private sanitizer: DomSanitizer
  ) {
  }

  ngOnInit(): void {
  }

  onUpload(event: any) {
    if (event.files.length != 1) {
      console.error("Shouldn't upload more than once");
    }
    for (let file of event.files) {
      this.result = event.originalEvent.body;
      this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(
        `data:image/png;base64, ${this.result!!.image}`
      );
      console.log(this.result)
    }
  }

}
