import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SharedModule } from "./shared/shared.module";
import { InMemoryWebApiModule } from "angular-in-memory-web-api";
import { InMemoryDataService } from "./shared/inmemory-db/inmemory-db.service";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpErrorInterceptor } from "./shared/interceptor/validator.service";
import { TokenInterceptor } from "./shared/interceptor/TokenInterceptor.service";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule,
    BrowserAnimationsModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService, {
      passThruUnknownUrl: true,
    }),
    AppRoutingModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: HttpErrorInterceptor,
    //   multi: true,
    // },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
