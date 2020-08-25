import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../store'
import { login, logout } from './store/actions';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { clearClients } from "../../../modules/clients/store/clients-actions";
import { clearTrends } from "../../../modules/trends/store/trends-actions";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    // reset login status
    this.store.dispatch(logout());
    this.store.dispatch(clearClients());
    this.store.dispatch(clearTrends());

    // get return url from route parameters or default to '/dashboard'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  authenticate(email: string, password: string) {
    this.store.dispatch(login({ email: email, password: password }));
    //this.router.navigateByUrl('/dashboard');
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Ok');
  }

}
