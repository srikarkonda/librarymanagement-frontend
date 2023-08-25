import { Component } from '@angular/core';
import { ApisService } from '../apis.service';
import { ToastrService } from 'ngx-toastr';
import { ColDef, GridApi } from 'ag-grid-community';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.css']
})
export class LoanComponent {

  loans:any;
  gridApi: GridApi | undefined
  public columnDefs: ColDef[] = [
    { field: 'bookTitle',tooltipField: 'bookTitle',checkboxSelection: true,},
    { field: 'userEmail',tooltipField: 'userEmail'},
    { field: 'dueDate',tooltipField: 'dueDate'},
    { field: 'returnDate' ,tooltipField: 'returnDate'}
  ];
  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };
  constructor(private apiService:ApisService,private toastrService: ToastrService) { 
    this.getLoans()
  }


  getLoans()
  {
    this.loans = []
        this.apiService.getLoanRecords().subscribe({
          next:(data)=>{
          console.log(data)
          if(data){
          this.loans = data;
          this.toastrService.success('Fetch loan records')
          }
        },
        error:(error)=>{
          console.log(error)
          this.toastrService.error(error?.message)
        }
      })
    }

    extendDueDate()
    {
      const payload=this.gridApi?.getSelectedRows()
      this.apiService.insertLoanData(payload).subscribe({
        next:(data)=>{
        console.log(data)
        if(data){
       this.getLoans()
        this.toastrService.success('Updated loan records')
        }
      },
      error:(error)=>{
        console.log(error)
        this.toastrService.error(error?.message)
      }
    })

    }
    onGridReady(event:any)
    {
    console.log(event)
    this.gridApi= event?.api
    }

    
}
