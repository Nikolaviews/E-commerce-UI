import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as echarts from 'echarts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit{

  selectedPeriod: string = "day"; // Define selectedPeriod property here
  myGroup!: FormGroup;
  chart: any;
  seriesData: any;
  axisData: any;

  constructor(private formBuilder: FormBuilder) {
    this.myGroup = this.formBuilder.group({
      validationName: ['']
    });

    this.seriesData = [
      {
        name: '100',
        type: 'bar',
        barGap: 0,
        // label: labelOption,
        emphasis: {
          focus: 'series'
        },
        data: [320, 332, 301, 334, 390]
      },
      {
        name: '200',
        type: 'bar',
        // label: labelOption,
        emphasis: {
          focus: 'series'
        },
        data: [220, 182, 191, 234, 290]
      },
      {
        name: '300',
        type: 'bar',
        // label: labelOption,
        emphasis: {
          focus: 'series'
        },
        data: [150, 232, 201, 154, 190]
      },
      {
        name: '400',
        type: 'bar',
        // label: labelOption,
        emphasis: {
          focus: 'series'
        },
        data: [98, 77, 101, 99, 40]
      },
      {
        name: '500',
        type: 'bar',
        // label: labelOption,
        emphasis: {
          focus: 'series'
        },
        data: [98, 77, 101, 99, 40]
      },
      {
        name: '600',
        type: 'bar',
        // label: labelOption,
        emphasis: {
          focus: 'series'
        },
        data: [98, 77, 101, 99, 40]
      },
      {
        name: '700',
        type: 'bar',
        // label: labelOption,
        emphasis: {
          focus: 'series'
        },
        data: [98, 77, 101, 99, 40]
      },
      {
        name: '800',
        type: 'bar',
        // label: labelOption,
        emphasis: {
          focus: 'series'
        },
        data: [98, 77, 101, 99, 40]
      },
      {
        name: '900',
        type: 'bar',
        // label: labelOption,
        emphasis: {
          focus: 'series'
        },
        data: [98, 77, 101, 99, 40]
      }
    ];

    this.axisData = [
      // Initial axis data...
    ];
  }

  ngOnInit(): void {
    this.chart = echarts.init(document.getElementById('echarts-container')!);
    this.renderChart();
  }

  renderChart(): void {
    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        // legend options...
      },
      toolbox: {
        // toolbox options...
      },
      xAxis: [
        {
          type: 'category',
          axisTick: { show: false },
          data: this.axisData
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: this.seriesData
    };

    this.chart.setOption(option);
  }

  // Other methods...
}