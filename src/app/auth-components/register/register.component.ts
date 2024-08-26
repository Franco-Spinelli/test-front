import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { RegisterRequest } from '../../auth/registerRequest';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]]
    });
  }
  register() {
    this.authService.register(this.registerForm.value as RegisterRequest).subscribe((data) => {
      this.router.navigateByUrl("/user-dashboard")  
    },
    (error) => {
    })
  }
}
