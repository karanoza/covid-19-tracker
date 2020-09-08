import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  @Input("totalConfirmed")
  totalConfirmed;
  @Input("totalActive")
  totalActive;
  @Input("totalRecovered")
  totalRecovered;
  @Input("totalDeaths")
  totalDeaths;

  constructor() {}

  ngOnInit(): void {}
}
