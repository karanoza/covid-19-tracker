import { DateWiseData } from "./../models/date-wise-data";
import { GlobalDataSummary } from "./../models/global-Data";
import { logging } from "protractor";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
@Injectable({
  providedIn: "root",
})
export class DataService {
  private globalDataUrl =
    "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/09-07-2020.csv";

  private dateWiseDataUrl =
    "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv";
  constructor(private http: HttpClient) {}

  getDateWiseData() {
    return this.http.get(this.dateWiseDataUrl, { responseType: "text" }).pipe(
      map((result) => {
        let rows = result.split("\n");
        // console.log(rows);
        let mainData = {};
        let header = rows[0];
        let dates = header.split(/,(?=\S)/);
        dates.splice(0, 4);
        rows.splice(0, 1);
        rows.forEach((row) => {
          let cols = row.split(/,(?=\S)/);
          let con = cols[1];
          cols.splice(0, 4);
          // console.log(con , cols);
          mainData[con] = [];
          cols.forEach((value, index) => {
            let dw: DateWiseData = {
              cases: +value,
              country: con,
              date: new Date(Date.parse(dates[index])),
            };
            mainData[con].push(dw);
          });
        });

        // console.log(mainData);
        return mainData;
      })
    );
  }

  getGlobalData() {
    return this.http.get(this.globalDataUrl, { responseType: "text" }).pipe(
      map((result) => {
        let data: GlobalDataSummary[] = [];

        let raw = {};
        let rows = result.split("\n");
        rows.splice(0, 1); // ignore 0th index value header

        rows.forEach((row) => {
          let cols = row.split(/,(?=\S)/); //Regex for every value that has comma but no whitespace

          let countrySummary = {
            country: cols[3],
            confirmed: +cols[7], //+ converts string value to integer or number
            deaths: +cols[8],
            recovered: +cols[9],
            active: +cols[10],
          };

          //merge countrywise data
          let temp: GlobalDataSummary = raw[countrySummary.country];
          if (temp) {
            temp.active = countrySummary.active + temp.active;
            temp.confirmed = countrySummary.confirmed + temp.confirmed;
            temp.deaths = countrySummary.deaths + temp.deaths;
            temp.recovered = countrySummary.recovered + temp.recovered;

            raw[countrySummary.country] = temp;
          } else {
            raw[countrySummary.country] = countrySummary;
          }
        });
        console.log(raw);
        return <GlobalDataSummary[]>Object.values(raw);
      })
    );
  }
}
