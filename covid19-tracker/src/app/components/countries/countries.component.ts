import { DateWiseData } from "./../../models/date-wise-data";
import { GlobalDataSummary } from "./../../models/global-Data";
import { Component, OnInit } from "@angular/core";
import { DataService } from "src/app/services/data.service";
import { GoogleChartInterface } from "ng2-google-charts";
import { merge } from "rxjs";
import { map } from "rxjs/operators";
@Component({
  selector: "app-countries",
  templateUrl: "./countries.component.html",
  styleUrls: ["./countries.component.css"],
})
export class CountriesComponent implements OnInit {
  data: GlobalDataSummary[];
  countries: string[] = [];

  totalConfirmed = 0;
  totalActive = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  dateWiseData;
  loading = true;
  selectedCountryData: DateWiseData[];
  lineChart: GoogleChartInterface = {
    chartType: "LineChart",
  };
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    merge(
      this.dataService.getDateWiseData().pipe(
        map((result) => {
          this.dateWiseData = result;
        })
      ),
      this.dataService.getGlobalData().pipe(
        map((result) => {
          this.data = result;
          this.data.forEach((cs) => {
            this.countries.push(cs.country);
          });
        })
      )
    ).subscribe({
      complete: () => {
        this.updateValues("India");
        this.loading = false;
      },
    });
  }
  updateChart() {
    let dataTable = [];
    dataTable.push(["Date", "Cases"]);
    this.selectedCountryData.forEach((cs) => {
      dataTable.push([cs.date, cs.cases]);
    });

    this.lineChart = {
      chartType: "LineChart",
      dataTable: dataTable,
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

  updateValues(country: string) {
    console.log(country);
    this.data.forEach((cs) => {
      if (cs.country == country) {
        this.totalActive = cs.active;
        this.totalDeaths = cs.deaths;
        this.totalRecovered = cs.recovered;
        this.totalConfirmed = cs.confirmed;
      }
    });

    this.selectedCountryData = this.dateWiseData[country];
    // console.log(this.selectedCountryData);
    this.updateChart();
  }
}
