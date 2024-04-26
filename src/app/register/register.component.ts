import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  genders = ['male', 'female'];
  formControlKeys: string[] = [];

  constructor(private router: Router, private formBuilder: FormBuilder, private apiService: ApiService) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      gender: ['male'], 
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      securityQuestion: ['', Validators.required],
      answer: ['', Validators.required]
    });
    this.formControlKeys = Object.keys(this.registerForm.controls);
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

  registerUser(): void {
    if (this.registerForm.valid) {
      this.apiService.registerUser(this.registerForm.value).subscribe(
        (response: any) => {
          console.log('Registration successful:', response);
          this.navigateToLogin();
        },
        error => {
          console.error('Registration failed:', error);
        }
      );
    } else {
      this.markAllAsTouched();
    }
  }

  isSubmitDisabled(): boolean {
    return this.registerForm.invalid;
  }

  markAllAsTouched(): void {
    Object.values(this.registerForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  getFormControlKeys(): string[] {
    return Object.keys(this.registerForm.controls);
  }
}
