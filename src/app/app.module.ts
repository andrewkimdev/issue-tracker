// Angular Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Vendor Modules
import { ClarityModule } from '@clr/angular';

// App Components
import { AppComponent } from './app.component';
import { IssueListComponent } from './issue-list/issue-list.component';

@NgModule({
  declarations: [
    AppComponent,
    IssueListComponent,
  ],
  imports: [
    // Angular Modules
    BrowserModule,
    BrowserAnimationsModule,
    // Vendor Modules
    ClarityModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
