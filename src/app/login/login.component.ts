import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Credentials } from '../models/Credential';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router, ActivatedRoute, Route } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  dataForm!: FormGroup<Credentials>;

  credential: Credentials = { Email: '', Password: '' };

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private toastService: NgToastService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.dataForm = this.fb.group({
      Email: [''],
      Password: [''],
    });
  }

  hide = true;

  login(): void {
    this.credential = {
      Email: this.dataForm.value.Email,
      Password: this.dataForm.value.Password,
    };
    this.authService.Authenticate(this.credential).subscribe((res: any) => {
      localStorage.setItem('token', res.token);
      
      var role = this.DecodeToken();
      if (role == 'Admin') {
        this.toastService.success({
          detail: 'Login Successfull',
          duration: 2000,
        });
        this.router.navigate(['/userList']);
        this.dataForm.reset();
      } else if (role == 'HR Admin') {
        this.router.navigate(['/hradmin']);
      } else if (role == 'Manager') {
        this.router.navigate(['/requests']);
      } else if (role == 'Employee') {
        this.router.navigate(['/requests']);
      } else {
        this.toastService.success({
          detail: 'UNSUCCESSFULL',
          summary: 'Please Try Again ',
          duration: 3000,
        });
        this.router.navigate(['/List']);
        this.dataForm.reset();
      }
    });
    console.log(this.dataForm.value);
  }

  DecodeToken(): string {
    const helper = new JwtHelperService();
    const token: any = localStorage.getItem('token');
    const decodeToken = helper.decodeToken(token);
    return decodeToken.rolename;
  }
}
