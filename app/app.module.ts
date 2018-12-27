import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppServicoJsonModule } from './servicojson/app-servicojson.module';
import { HTTP_PROVIDERS } from '@angular/http';
import { AtosService } from './servicojson/atos.service';
import { HttpModule } from '@angular/http';
import { AtosComponent } from './servicojson/atos.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ROUTER_PROVIDERS, RouteConfig, ROUTER_DIRECTIVES } from '@angular/router-deprecated';

@NgModule({
    imports: [BrowserModule, FormsModule, AppServicoJsonModule,HttpModule
    ],
    providers: [AtosService],
    declarations: [AppComponent,AtosComponent],
    bootstrap: [AppComponent],
})

export class AppModule{ }
