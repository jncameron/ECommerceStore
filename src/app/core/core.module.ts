import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [NavBarComponent, AboutComponent],
  imports: [CommonModule, RouterModule],
  exports: [NavBarComponent, AboutComponent],
})
export class CoreModule {}
