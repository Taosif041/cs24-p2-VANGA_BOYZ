import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    // Your components, directives, and pipes
  ],
  imports: [
    BrowserModule,
    HttpClientModule, // Add HttpClientModule to imports array
  ],
  providers: [],
  bootstrap: [], // Assuming AppComponent is your root component
})
export class AppModule {}
