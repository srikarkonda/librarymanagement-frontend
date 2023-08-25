import { Component, OnInit } from '@angular/core';
import { ApisService } from '../apis.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
userName:any
password:any
constructor(private apiService:ApisService,private route:Router) { }
  ngOnInit(): void {
    
  }

  login()
  {
    this.apiService.login({userName:this.userName,password:this.password}).subscribe({
      next:(data:any)=>{
      console.log(data)
      if(data?.length>0){
        sessionStorage.setItem('user',JSON.stringify(data))
        this.route.navigate(['/dashboard/library'])
      }
    },
    error:(error)=>{
      console.log(error)
    }
  })
  }

}
