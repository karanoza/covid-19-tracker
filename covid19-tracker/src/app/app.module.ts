import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { HomeComponent } from "./components/home/home.component";
import { CountriesComponent } from "./components/countries/countries.component";
import { HttpClientModule } from "@angular/common/http";
import { DataService } from "./services/data.service";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { Ng2GoogleChartsModule } from "ng2-google-charts";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    CountriesComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    Ng2GoogleChartsModule,
  ],

  providers: [DataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
