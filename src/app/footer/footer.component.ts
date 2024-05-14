import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ECharts, EChartsOption } from 'echarts';
import * as echarts from 'echarts';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit, AfterViewInit {
  myChart!: ECharts;
  optionStack: string[] = [];
  allOptions: { [index: string]: EChartsOption } = {};
  currentOptionId!: string;
  option5: EChartsOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['Forest', 'Steppe', 'Desert', 'Wetland']
    },
    toolbox: {
      show: true,
      orient: 'vertical',
      left: 'right',
      top: 'center',
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ['line', 'bar', 'stack'] },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    xAxis: [
      {
        type: 'category',
        axisTick: { show: false },
        data: ['2012', '2013', '2014', '2015', '2016']
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: 'Forest',
        type: 'bar',
        barGap: 0,
        emphasis: {
          focus: 'series'
        },
        data: [320, 332, 301, 334, 390]
      },
      {
        name: 'Steppe',
        type: 'bar',
        emphasis: {
          focus: 'series'
        },
        data: [220, 182, 191, 234, 290]
      },
      {
        name: 'Desert',
        type: 'bar',
        emphasis: {
          focus: 'series'
        },
        data: [150, 232, 201, 154, 190]
      },
      {
        name: 'Wetland',
        type: 'bar',
        emphasis: {
          focus: 'series'
        },
        data: [98, 77, 101, 99, 40]
      }
    ]
  };

  constructor() { }

  ngOnInit(): void {
    this.initializeOptions();
  }

  ngAfterViewInit(): void {
    this.myChart = echarts.init(document.getElementById('chart') as HTMLDivElement);
    this.renderChart('option5'); // Render the initial chart using option5
  }

  initializeOptions(): void {
    // You can initialize other options here if needed
  }

  renderChart(optionId: string): void {
    console.log('Option ID:', optionId);
    console.log('All options:', this.allOptions);
    const option = this.allOptions[optionId];
    console.log('Option:', option);
    if (option) {
        this.myChart.setOption(option);
        this.currentOptionId = optionId;
    } else {
        console.error('Option is null or undefined!');
    }
  }

  goForward(optionId: string): void {
    this.optionStack.push(this.currentOptionId);
    this.renderChart(optionId);
  }

  goBack(): void {
    if (this.optionStack.length === 0) {
      console.log('Already in root level!');
    } else {
      console.log('Go back to previous level.');
      const prevOptionId = this.optionStack.pop() as string;
      this.renderChart(prevOptionId);
    }
  }

  onClickSeries(params: any): void {
    // Handle series click event here if needed
  }
}
