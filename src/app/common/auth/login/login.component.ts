import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { TavernsService } from '../../../tavern/taverns.service';

@Component({
    templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
    ngOnInit(): void {
        this.tavernService.getAll().subscribe((returnedTaverns) => {
            
            this.Taverns=returnedTaverns;
            console.log(this.Taverns[0].TavernName);
        });
    }
    userName = '';
    password = '';
    flagSignup = false;
    selected: any ;
    checkAdmin: boolean;
    checkManag: boolean;
    Taverns=[];
// tslint:disable-next-line: member-ordering
     Tavern = {
        TavernName: '',
        ID : 1
      };
    constructor(private router: Router, private authService: AuthService, private tavernService: TavernsService) {}

    login(): void {
        this.authService.login(this.userName, this.password).subscribe(
            (response) => {
                if (response.success) {
                    console.log('successful login', response.user);
                    this.router.navigateByUrl('/myTavern');
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
        this.flagSignup = !this.flagSignup;

    }

    signUp(): void {
        console.log(this.selected.ID);
        const payload = {
            UserName: this.userName,
            Password: this.password,
            Tavern: {
                ID: this.selected.ID,
                TavernName: this.selected.Name
            }
        };

        this.authService.signup(payload).subscribe((user) => {
            this.router.navigateByUrl('/login');
            this.toogleSignUp();
        },
        (error) => {
            console.log(error);
        },
        );
    }
}
