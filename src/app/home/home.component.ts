import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product-service.service';
import { Product } from '../models/product.model';  
import type { EChartsOption, ECharts } from 'echarts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  randomProducts2: Product[] = [];
  randomProducts: Product[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe(
      (data: Product[]) => {
        this.products = data;
      },
      error => {
        console.log('Error fetching products:', error);
      }
    );
  }

  loadRandomProducts() {
    this.productService.getRandomProducts().subscribe(
      (data: Product[]) => {
        this.randomProducts = data;
      },
      error => {
        console.log('Error fetching random products:', error);
      }
    );
  }

  loadRandomProducts2() {
    this.productService.getRandomProducts2().subscribe(
      (data: Product[]) => {
        this.randomProducts2 = data;
      },
      error => {
        console.log('Error fetching random products:', error);
      }
    );
  }

  addToCart(product: Product) {
    this.productService.addToCart(product).subscribe(
      response => {
        console.log('Product added to cart successfully:', response);
      },
      error => {
        console.log('Error adding product to cart:', error);
      }
    );
  }

  // echarts implementation
  option1: EChartsOption = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line'
      }
    ]
  };  
  option2: EChartsOption = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'bar'
      }
    ]
  };  
  option3: EChartsOption = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'pie'
      }
    ]
  }; 
    
  option4: EChartsOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [
      {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar',
          stack: 'a',
          name: 'a'
      },
      {
          data: [10, 46, 64, '-', 0, '-', 0],
          type: 'bar',
          stack: 'a',
          name: 'b'
      },
      {
          data: [30, '-', 0, 20, 10, '-', 0],
          type: 'bar',
          stack: 'a',
          name: 'c'
      },
      {
          data: [30, '-', 0, 20, 10, '-', 0],
          type: 'bar',
          stack: 'b',
          name: 'd'
      },
      {
          data: [10, 20, 150, 0, '-', 50, 10],
          type: 'bar',
          stack: 'b',
          name: 'e'
      }
    ]
  };    

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
        // label: labelOption,
        emphasis: {
          focus: 'series'
        },
        data: [320, 332, 301, 334, 390]
      },
      {
        name: 'Steppe',
        type: 'bar',
        // label: labelOption,
        emphasis: {
          focus: 'series'
        },
        data: [220, 182, 191, 234, 290]
      },
      {
        name: 'Desert',
        type: 'bar',
        // label: labelOption,
        emphasis: {
          focus: 'series'
        },
        data: [150, 232, 201, 154, 190]
      },
      {
        name: 'Wetland',
        type: 'bar',
        // label: {
        //   formatter: '{c}  {name|{a}}',
        //   fontSize: 16,
        //   rich: {
        //     name: {}
        //   }
        // },
        emphasis: {
          focus: 'series'
        },
        data: [98, 77, 101, 99, 40]
      }
    ]
  };

}