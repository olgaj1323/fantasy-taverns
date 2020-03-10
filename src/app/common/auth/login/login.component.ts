import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
    templateUrl: './login.component.html',
})
export class LoginComponent {
    userName = '';
    password = '';
    flagSignup = false;

    constructor(private router: Router, private authService: AuthService) {}

    login(): void {
        this.authService.login(this.userName, this.password).subscribe(
            (response) => {
                if (response.success) {
                    console.log('successful login');
                    this.router.navigateByUrl('/home');
                }
            },
            (error) => {
                console.log('username/password incorrect');
            },
        );
    }
    toogleSignUp():void{
        this.userName='';
        this.password='';
        this.flagSignup = !this.flagSignup;
    }

    signUp():void{
        const payload={
            userName:this.userName,
            Pass: this.password
        };

        console.log(payload);
    }
}
