import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {CountryNamePipe} from "../../pipes/country-name.pipe";
import {UIChart} from "primeng/chart";

interface Record {
  continent: string,
  location: string,
  date: number[], // year, month, dayOfMonth
  newCaseCountPerDay: number,
  deathCountPerDay: number,
}

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  private apiUrl = `${environment.backendUrl}/covid`

  continents: string[] = [];
  selectedContinents: string[] = [];

  locations: string[] = [];
  selectedLocations: string[] = [];

  selectedDate: Date = new Date();
  minDate: Date = new Date();
  maxDate: Date = new Date();

  // @ts-ignore
  @ViewChild('chart') chart: UIChart;

  newCase7DayData: any;
  deathCase7DayData: any;

  oneDayNewCase: any;
  oneDayDeathCase: any;

  counter = new Int8Array(1);

  constructor(
    private httpClient: HttpClient
  ) {
    this.counter[0] = 0;

  }

  ngOnInit(): void {
    this.getContinents();
    this.getDataRange();
    this.getLocations();
  }

  private generateRandomColor(): string {
    let randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return `#${randomColor}`;
  }

  private getContinents(): void {
    this.httpClient.get(`${this.apiUrl}/continent`)
      .subscribe((r) => {
        this.continents = r as string[];
      });
  }

  private getDataRange(): void {
    this.httpClient.get(`${this.apiUrl}/date`)
      .subscribe((r) => {
        let result = r as { max: number[], min: number[] };
        this.maxDate = new Date(result.max[0], result.max[1] - 1, result.max[2]);
        this.minDate = new Date(result.min[0], result.min[1] - 1, result.min[2]);
        this.selectedDate = this.maxDate;
        this.getDistributeData();
      });
  }

// update locations based on selected continents
  getLocations() {
    let p = {};
    if (this.selectedContinents.length != 0) {
      p = {continent: this.selectedContinents.join(",")}
    }
    this.httpClient.get(
      `${this.apiUrl}/locations`,
      {
        params: p
      }
    ).subscribe((r) => {
      this.locations = r as string[];
      this.selectedLocations = [];
      this.getDistributeData();
    });
  }

// fetch new data
  getDistributeData() {
    let p = new HttpParams();
    if (this.selectedLocations.length == 0) {
      return;
    }
    p = p.append("location", this.selectedLocations.join(","));

    let newCase7dayData: any = {labels: ['1', '2', '3', '4', '5', '6', '7'], datasets: []};
    let deathCase7dayData: any = {labels: ['1', '2', '3', '4', '5', '6', '7'], datasets: []};
    let oneDayNewCase: any = {labels: [], datasets: [{data: [], backgroundColor: [], hoverBackgroundColor: []}]};
    let oneDayDeathCase: any = {labels: [], datasets: [{data: [], backgroundColor: [], hoverBackgroundColor: []}]};

    const pipe = new CountryNamePipe();
    this.selectedLocations.forEach((l) => {
      newCase7dayData.datasets.push(
        {
          label: pipe.transform(l),
          data: [0, 0, 0, 0, 0, 0, 0],
          fill: false,
          borderColor: this.generateRandomColor()
        }
      );
      deathCase7dayData.datasets.push(
        {
          label: pipe.transform(l),
          data: [0, 0, 0, 0, 0, 0, 0],
          fill: false,
          borderColor: this.generateRandomColor()
        }
      );
      oneDayNewCase.labels.push(pipe.transform(l));
      oneDayDeathCase.labels.push(pipe.transform(l));
    });
    Atomics.add(this.counter, 0, 7);

    const colors = this.selectedLocations.map((s) => this.generateRandomColor());

    for (let i = 0; i < 7; i++) {
      let date = new Date(this.selectedDate.getTime() - i * 86400000);
      let temp = p.append("year", date.getFullYear());
      temp = temp.append("month", date.getMonth() + 1);
      temp = temp.append("day", date.getDate());

      newCase7dayData.labels[6 - i] = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      deathCase7dayData.labels[6 - i] = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

      this.httpClient.get(
        `${this.apiUrl}/distribution`,
        {
          params: temp
        }
      ).subscribe((r) => {
        Atomics.sub(this.counter, 0, 1);
        let result = r as Record[];
        this.selectedLocations.forEach((l, index) => {
          const filtered = result.filter((re) => re.location.toLowerCase() == l.toLowerCase());
          let newCasePerDay = 0;
          let deathCasePerDay = 0;
          if (filtered[0] != undefined) {
            newCasePerDay = filtered[0].newCaseCountPerDay;
            deathCasePerDay = filtered[0].deathCountPerDay;
          }

          newCase7dayData.datasets[index].data[6 - i] = newCasePerDay;
          newCase7dayData.datasets[index].borderColor = colors[index];
          deathCase7dayData.datasets[index].data[6 - i] = deathCasePerDay;
          deathCase7dayData.datasets[index].borderColor = colors[index];
          // only for one day
          if (i == 0) {
            oneDayNewCase.datasets[0].data[index] = newCasePerDay;
            oneDayNewCase.datasets[0].backgroundColor[index] = colors[index];
            oneDayNewCase.datasets[0].hoverBackgroundColor[index] = colors[index];
            oneDayDeathCase.datasets[0].data[index] = deathCasePerDay;
            oneDayDeathCase.datasets[0].backgroundColor[index] = colors[index];
            oneDayDeathCase.datasets[0].hoverBackgroundColor[index] = colors[index];
          }
        })
        if (this.counter[0] == 0) {
          this.newCase7DayData = newCase7dayData;
          this.deathCase7DayData = deathCase7dayData;
        }

        if (i == 0) {
          // one day
          this.oneDayNewCase = oneDayNewCase;
          this.oneDayDeathCase = oneDayDeathCase;
        }
      });
    }
  }
}
