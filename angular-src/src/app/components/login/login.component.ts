import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessage } from 'angular-flash-message';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username : String;
  password : String;
  constructor(
    private authservice : AuthService,
    private flashMessage : FlashMessage,
    private router : Router
  ) { }

  ngOnInit() {
  }
  onLoginSubmit(){
    const user = {
      username : this.username,
      password : this.password
    }
    this.authservice.authenticateUser(user).subscribe(data => {
      if(data.success){
        this.authservice.storeUserData(data.token, data.user);
        this.flashMessage.success('Your are now Logged In.',{dalay: 3000,close: true});
        this.router.navigate(['/dashboard']);
      }else{
        this.flashMessage.danger(data.msg,{dalay: 3000,close: true});
        this.router.navigate(['/login']);
      }
    });
  } 

}
