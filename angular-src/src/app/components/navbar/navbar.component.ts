import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessage } from 'angular-flash-message';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public isCollapsed = false;
  constructor(
    private authservice : AuthService, 
    private flashmessage : FlashMessage,
    private router : Router
  ) { }

  ngOnInit() {
  }

  onlogoutClick(){
    this.authservice.logout();
    this.flashmessage.success('Your are Logged Out.',{dalay: 3000,close: true});
    this.router.navigate(['/login']);
    return false;
  }

}
