import { GlobalDataSummary } from "./../../models/global-Data";
import { Component, OnInit } from "@angular/core";
import { DataService } from "src/app/services/data.service";
import { GoogleChartInterface } from "ng2-google-charts";
import { GoogleChartsDataTable } from "ng2-google-charts/lib/google-charts-datatable";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  totalConfirmed = 0;
  totalActive = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  loading = true;
  globalData: GlobalDataSummary[];
  dataTable = [];

  PieChart: GoogleChartInterface = {
    chartType: "PieChart",
  };

  ColumnChart: GoogleChartInterface = {
    chartType: "ColumnChart",
  };

  constructor(private dataService: DataService) {}

  updateChart(input: HTMLInputElement) {
    console.log(input.value);
    this.initChart(input.value);
  }

  initChart(caseType: string) {
    // What values you wanna show push into datatable
    this.dataTable = [];
    this.dataTable.push(["Country", "Cases"]);

    this.globalData.forEach((cs) => {
      let value: number;
      if (caseType == "c") if (cs.confirmed > 2000) value = cs.confirmed;

      if (caseType == "a") if (cs.active > 2000) value = cs.active;
      if (caseType == "d") if (cs.deaths > 1000) value = cs.deaths;

      if (caseType == "r") if (cs.recovered > 2000) value = cs.recovered;

      this.dataTable.push([cs.country, value]);
    });

    console.log(this.dataTable);

    // Piechart
    this.PieChart = {
      chartType: "PieChart",
      dataTable: this.dataTable,
      //firstRowIsData: true,
      options: { height: 500 },
    };

    // ColumnChart
    this.ColumnChart = {
      chartType: "ColumnChart",
      dataTable: this.dataTable,
      //firstRowIsData: true,
      options: {
        height: 500,
        animation: {
          duration: 1000,
          easing: "out",
        },
        is3D: true,
      },
    };
  }

  ngOnInit(): void {
    this.dataService.getGlobalData().subscribe({
      next: (result) => {
        console.log(result);
        this.globalData = result;
        result.forEach((cs) => {
          if (!Number.isNaN(cs.confirmed)) {
            this.totalActive += cs.active;
            this.totalConfirmed += cs.confirmed;
            this.totalDeaths += cs.deaths;
            this.totalRecovered += cs.recovered;
          }
        });

        this.initChart("c");
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
}
