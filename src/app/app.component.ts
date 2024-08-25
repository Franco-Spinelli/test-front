import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'challengeFront';
  isLogged:boolean = true;
  constructor(private authService: AuthService){}
  ngOnInit(): void {
     this.authService.userLoginOn.subscribe((data)=>{
      this.isLogged = data;
    })
  }
  isLogin():boolean{
    return this.authService.isUserLoggedIn();
  }
}
