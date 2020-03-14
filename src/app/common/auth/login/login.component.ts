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
    selected:any ;
    check:boolean;
     Tavern = {
        TavernName:'',
        TaverId : 1
      };
    

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
        this.check=false;
        //this.selected=undefined;
        this.flagSignup = !this.flagSignup;

    }

    signUp():void{
        console.log(this.selected);
        const payload={
            UserName:this.userName,
            Password: this.password,
            Tavern:{
                Id:this.selected.Id,
                TavernName:this.selected.Name
            }
        };

        console.log(payload);
        this.authService.signup(payload).subscribe((user)=>{
            console.log(user);
            this.router.navigateByUrl('/login');
            //this.toogleSignUp();
        },
        (error) => {
            console.log(error);
        },
        );
    }
}
