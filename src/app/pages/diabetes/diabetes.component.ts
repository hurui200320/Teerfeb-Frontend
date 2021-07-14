import {Component, OnInit} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-diabetes',
  templateUrl: './diabetes.component.html',
  styleUrls: ['./diabetes.component.css']
})
export class DiabetesComponent implements OnInit {
  private apiUrl = `${environment.backendUrl}/diabetes`

  inputs: { id: string, name: string, description: string, min: number, step: number, value: number }[] = [
    {
      id: 'pregnancies',
      name: 'Number of times pregnant',
      description: '怀孕次数',
      min: 0,
      step: 1,
      value: 0
    },
    {
      id: 'glucose',
      name: 'Plasma glucose concentration',
      description: '口服葡萄糖耐量试验2小时后的血浆葡萄糖浓度。单位：mg/dL',
      min: 1,
      step: 1,
      value: 62
    }, {
      id: 'bloodPressure',
      name: 'Diastolic blood pressure',
      description: '舒张压，单位：mmHg',
      min: 1,
      step: 1,
      value: 80
    }, {
      id: 'skinThickness',
      name: 'Triceps skin fold thickness',
      description: '三头肌皮褶厚度，单位：毫米',
      min: 0,
      step: 1,
      value: 35
    }, {
      id: 'insulin',
      name: '2-Hour serum insulin',
      description: '两小时血清胰岛素水平，单位：μU/ml',
      min: 0,
      step: 1,
      value: 0
    }, {
      id: 'bmi',
      name: 'Body mass index (BMI)',
      description: '身体质量指数',
      min: 0.1,
      step: 0.1,
      value: 31.2
    }, {
      id: 'function',
      name: 'Diabetes pedigree function',
      description: '糖尿病谱系函数，该函数使用家族糖尿病史导出个人患糖尿病的风险值',
      min: 0,
      step: 0.001,
      value: 0.2
    }, {
      id: 'age',
      name: 'Age',
      description: '年龄',
      min: 0,
      step: 1,
      value: 25
    },
  ];

  result: number | null = null;

  constructor(
    private httpClient: HttpClient
  ) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    const formData = new URLSearchParams();
    this.inputs.forEach((value) => {
      formData.set(value.id, String(value.value));
    });
    this.httpClient.post(
      this.apiUrl,
      formData.toString(),
      {headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')}
    ).subscribe((result: any) => {
      this.result = Number(result['result']);
    });
  }
}
