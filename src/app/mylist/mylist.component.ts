import { Component } from '@angular/core';
import { ColDef, GridApi } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { ApisService } from '../apis.service';

@Component({
  selector: 'app-mylist',
  templateUrl: './mylist.component.html',
  styleUrls: ['./mylist.component.css']
})
export class MylistComponent {

  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    width:400
  };
  gridApi: GridApi | undefined;
  loans:any;
  public columnDefs: ColDef[] =[
    { field: 'bookTitle',tooltipField: 'bookTitle',checkboxSelection: true,},
    { field: 'userEmail',tooltipField: 'userEmail'},
    { field: 'dueDate',tooltipField: 'dueDate'},
    { field: 'returnDate' ,tooltipField: 'returnDate'}
  ];

  constructor(private apiService:ApisService,private toastrService: ToastrService) { 
   
    this.getMyLoanRecords()
  }
  onGridReady(event:any)
  {
    console.log(event)
    this.gridApi= event?.api
  }
  getMyLoanRecords()
  {

    this.apiService.getMyLoanRecords().subscribe({
      next:(data)=>{
      console.log(data)
      if(data){
       this.loans = data;
       this.toastrService.success('Fetch library books')
      }
    },
    error:(error)=>{
      console.log(error)
      this.toastrService.error(error?.message)
    }
  })
  }

  returnBooks()
  {
    const payload = this.gridApi?.getSelectedRows();
    const loanList = []
    payload?.forEach(data=>{
      loanList.push({
        bookId: data?.bookId,
        
      })
    })
    this.apiService.updateLoanData(payload).subscribe({
      next:(data)=>{
      console.log(data)
      if(data){
       this.toastrService.success('return Book successfully')
       this.getMyLoanRecords()
      }
    },
    error:(error)=>{
      console.log(error)
      this.toastrService.error(error?.message)
    }
    })
  }

}
