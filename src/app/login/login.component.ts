import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api-service.service';
import { MatSnackBar, MatSnackBarConfig  } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }

  get formControls() {
    return this.loginForm.controls;
  }

  login(): void {
    if (this.loginForm.invalid) {
      return;
    }
  
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
  
    if (email && password) {
      this.apiService.loginUser(email, password)
        .subscribe(
          (response) => {
            if (response === 'Login successful') {
              console.log("Success", response);
              this.openSnackBar('Login Successful');
              this.navigateToHome();
            } else {
              console.log("Unsuccess", response);
              this.openSnackBar('Invalid email or password');
            }
          },
          (error) => {
            console.error('Login error:', error);
            if (error.status === 401) {
              this.errorMessage = 'Invalid email or password';
            } else {
              this.errorMessage = 'An error occurred. Please try again later.';
            }
          }
        );
    }
  }

  openSnackBar(message: string) {
    const config = new MatSnackBarConfig();
    config.duration = 2000;
    config.horizontalPosition = 'center';
    config.verticalPosition = 'top';

    this._snackBar.open(message, 'Dismiss', config);
  } 
}