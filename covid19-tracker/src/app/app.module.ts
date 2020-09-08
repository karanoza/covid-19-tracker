import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { HomeComponent } from "./components/home/home.component";
import { CountriesComponent } from "./components/countries/countries.component";
import { HttpClientModule } from "@angular/common/http";
import { DataService } from "./services/data.service";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    CountriesComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],

  providers: [DataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
