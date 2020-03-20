import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
    templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
    ngOnInit(): void {
        
    }
    userName = '';
    password = '';
    flagSignup = false;
    selected: any ;
    checkAdmin: boolean;
    checkManag: boolean;
     Tavern = {
        TavernName: '',
        TaverId : 1
      };
    Taverns = [{
            Id: 1,
            Name: "John's Tavern"
          },
          {
            Id: 2,
            Name: "Moe's Tavern"
          },
          {
           Id: 3,
            Name:'Kate\'s Tavern'
          }];


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
    toogleSignUp(): void {
        this.userName = '';
        this.password = '';
        this.checkAdmin = false;
        this.checkManag = false;
        
        
        // this.selected=undefined;
        this.flagSignup = !this.flagSignup;

    }

    signUp(): void {
        console.log(this.selected);
        const payload = {
            UserName: this.userName,
            Password: this.password,
            Tavern: {
                Id: this.selected.Id,
                TavernName: this.selected.Name
            }
        };

        console.log(payload);
        this.authService.signup(payload).subscribe((user) => {
            console.log(user);
            this.router.navigateByUrl('/login');
            // this.toogleSignUp();
        },
        (error) => {
            console.log(error);
        },
        );
    }
}
