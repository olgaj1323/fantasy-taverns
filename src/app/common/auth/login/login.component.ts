import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { TavernsService } from '../../../tavern/taverns.service';
import { ɵNAMESPACE_URIS } from '@angular/platform-browser';

@Component({
    templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
    constructor(private router: Router, private authService: AuthService, private tavernService: TavernsService) {}

    userName = '';
    password = '';
    flagSignup = false;
    selected: any ;
    check = 'Manager';
    checkManag: boolean;
    Taverns = [];
    NameTavern = '';
    IDTavern = 1;
     Tavern = {
        TavernName: '',
        ID : 0
      };
    ngOnInit(): void {
        this.tavernService.getAll().subscribe((returnedTaverns) => {
             this.Taverns = returnedTaverns;
        });
    }

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
        this.check = 'Manager';
        this.checkManag = false;
        this.flagSignup = !this.flagSignup;
        console.log('flag', this.flagSignup);
        console.log('check', this.check);


    }

    signUp(): void {
        
        if (this.check === 'Manager') {
            console.log(this.selected);
            this.Tavern.TavernName = this.selected.Name;
             this.Tavern.ID = this.selected.ID;
            }
        console.log(this.Tavern);
        const payload = {
            UserName: this.userName,
            Password: this.password,
            Tavern: {
                TavernName: this.Tavern.TavernName,
                ID: this.Tavern.ID
            }
        };
        console.log('payload',payload)
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
