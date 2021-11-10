import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TestComponent } from './pages/test/test.component';
import { GladiatorsComponent } from './pages/gladiators/gladiators.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HighchartsChartModule } from 'highcharts-angular';
import { KatexModule } from 'ng-katex';
import { HttpClientModule } from '@angular/common/http';
import { InlineSVGModule } from 'ng-inline-svg';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { AngularStickyThingsModule } from '@w11k/angular-sticky-things';
import { MartingaleComponent } from './pages/martingale/martingale.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'test', component: TestComponent },
  { path: 'gladiators', component: GladiatorsComponent },
  { path: 'martingale', component: MartingaleComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TestComponent,
    GladiatorsComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MaterialModule,
    DragDropModule,
    MatButtonModule,
    MatIconModule,
    HighchartsChartModule,
    KatexModule,
    HttpClientModule,
    InlineSVGModule.forRoot(),
    MatSlideToggleModule,
    MatSidenavModule,
    FormsModule,
    MatToolbarModule,
    MatDividerModule,
    AngularStickyThingsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
