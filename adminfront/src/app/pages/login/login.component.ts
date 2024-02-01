import { Component } from '@angular/core';
import { FormControl,  } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { z } from 'zod';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private authenticationService: AuthenticationService, private router: Router) { }


  email = new FormControl('');
  password = new FormControl('');


  emailError: null | string = null
  passwordError: null | string = null

  loading: boolean = false

  message = ''
  // submit button
  submit() {
    this.setLoading(true)

    this.validateEmail()
    this.validatePassword()


    if (this.emailError || this.passwordError || !this.email.value || !this.password.value) {
      this.setLoading(false)
      return
    }

      this.authenticationService.login(this.email.value, this.password.value)
      .subscribe((response) => {
        if (response.error || !response.access_token) {
          this.message = response.error || 'Something went wrong'
        } else {
          this.authenticationService.updateToken(response.access_token)
          this.router.navigate(['/'])
        }
        this.setLoading(false)
      }, (error) => {
        if (error.error?.message) {
          this.message = error.error.message
        } else {
          this.message = error.message
        }
        this.setLoading(false)
      })
  }

  // Utilities
  setLoading(state: boolean) {
    if (state) {
      this.loading = true
      this.email.disable()
      this.password.disable()
    } else {
      this.loading = false
      this.email.enable()
      this.password.enable()
    }
  }


  // Validators
  validateEmail() {
    const schema = z.string()
      .email()
      .min(3, { message: 'Email est trop court (minimum 3 caractères.)' })
      .max(30, { message: 'Email est trop long (maximum 30 caractères)' })

    const result =  schema.safeParse(this.email.value)
    if (!result.success) {
      this.emailError = result.error.errors[0].message
    } else {
      this.emailError = ''
    }
  }

  validatePassword() {
    const schema = z.string()
      .min(3, { message: 'Le mot de passe est trop court (minimum 3 caractères.)' })
      .max(30, { message: 'Le mot de passe est trop long (maximum 30 caractères)' })
    const result =  schema.safeParse(this.password.value)
    if (!result.success) {
      this.passwordError = result.error.errors[0].message
    } else {
      this.passwordError = ''
    }
  }
}
