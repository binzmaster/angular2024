import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import config from '../../config';
import { MyModalComponent } from "../my-modal/my-modal.component";

@Component({
  selector: 'app-foodtype',
  standalone: true,
  imports: [FormsModule, MyModalComponent],
  templateUrl: './foodtype.component.html',
  styleUrl: './foodtype.component.css'
})
export class FoodtypeComponent {
  name:string='';
  remark: string='';
  foodTypes: any = [];
    constructor(private http:HttpClient) {}
    
    save(){
      try {
        const payload = {
          name : this.name,
          remark :this.remark
        }
        this.http.post(config.apiServer+'/api/foodType/create', payload)
        .subscribe((res): any =>{
          this.fetchData();

        });
      } catch (e:any) {
        Swal.fire({
          title:'error',
          text: e.message,
          icon : 'error'
        })
        
      }
    }
    ngOnInit(){
      this.fetchData();
    }
    fetchData(){
      this.http
      .get(config.apiServer+ '/api/foodType/list')
      .subscribe((res:any)=>{
        this.foodTypes= res.results;
      });
    }
}
