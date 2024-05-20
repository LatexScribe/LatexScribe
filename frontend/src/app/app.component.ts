import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './service/authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'Latex Scribe';

  currentUserUsername: string = '';
  constructor(private service: AuthenticationService, private router: Router) {}
  ngOnInit(): void {
    this.service.onAuthenticationChanged().subscribe((username: string) => {
      this.currentUserUsername = username;
    });
  }

  logoutUser() {
    this.service.logout();
    this.router.navigate(['/']);
  }
}
