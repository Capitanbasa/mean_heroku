import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessage } from 'angular-flash-message';

import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name:String;
  username : String;
  email:String;
  password:String;

  constructor(
    private validateService : ValidateService, 
    private flashMessage : FlashMessage, 
    private authservice : AuthService,
    private router : Router
  ) { }

  ngOnInit() {
  }
  onRegisterSubmit(){
    const user = {
      name : this.name,
      username : this.username,
      email : this.email,
      password : this.password
    }
    if(!this.validateService.validateRegister(user)){
      this.flashMessage.warning('Please Fill Up all required Fields!',
        {
          dalay: 3000,
          generalClass: 'alert alert-danger',
          close: true
      }
    );
      return false;
    }
  
    if(!this.validateService.validateEmail(user.email)){
      this.flashMessage.warning('Invalid Emaill Address!',
        {
          dalay: 3000,
          generalClass: 'alert alert-danger',
          close: true
        }
      );
      return false;
    }

    //Register user to expressjs backend api
    this.authservice.registerUser(user).subscribe(data => {
      if(data.success){
        this.flashMessage.warning('Successfully Registered',
          {
            dalay: 3000,
            generalClass: 'alert alert-success',
            close: true
          }
        );
        this.router.navigate(['/login']);
      }else{
        this.flashMessage.warning('Somthing went wrong!',
          {
            dalay: 3000,
            generalClass: 'alert alert-danger',
            close: true
          }
        );
        this.router.navigate(['/register']);
      }
    });
  }
}
