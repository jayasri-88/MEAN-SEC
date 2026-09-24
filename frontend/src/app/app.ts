import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header';
import { NavbarComponent } from './components/navbar/navbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, NavbarComponent],
  template: `
    <app-header />
    <app-navbar />
    <main style="min-height:60vh">
      <router-outlet />
    </main>
    <footer style="text-align:center;padding:1rem;color:#64748b;border-top:1px solid #e2e8f0;margin-top:2rem">
      Student Management System — MEAN Stack Lab R24MSCSL009 | Angular 21 • Express • MongoDB • JWT • Multer
    </footer>
  `
})
export class App {}
