import { Component } from '@angular/core';
import { ApisService } from '../apis.service';
import { ColDef, GridApi } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-managebooks',
  templateUrl: './managebooks.component.html',
  styleUrls: ['./managebooks.component.css']
})
export class ManagebooksComponent {

  public books:any;
  enableForm = false
  tableView = true
  savePayload :any[] = [];
  gridApi: GridApi | undefined
  searchText = ''
  isLibraryManager = false;
  public columnDefs: ColDef[] = []
  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };
  userId:any;
  backupData:any;
  constructor(private apiService:ApisService,private toastrService: ToastrService) { 
   
    const user = JSON.parse(sessionStorage.getItem('user') || '{}')[0]
    this.isLibraryManager = user['libraryManager'];
    this.userId = user['userId'];
    console.log(this.isLibraryManager)
    this.columnDefs =[
      { field: 'title',tooltipField: 'title',editable:this.isLibraryManager,checkboxSelection: true,},
      { field: 'author',tooltipField: 'author',editable:this.isLibraryManager},
      { field: 'publisher',tooltipField: 'publisher',editable:this.isLibraryManager},
      { field: 'description',tooltipField: 'description',editable:this.isLibraryManager},
      { field: 'price' ,tooltipField: 'price',editable:this.isLibraryManager},
      { field: 'numberOfCopies' ,tooltipField: 'numberOfCopies',editable:this.isLibraryManager},
      { field: 'borrowCount' ,tooltipField: 'borrowCount'},
      
    ];
    this.getBooks()
  }
  

  getBooks()
  {
this.books = []
    this.apiService.getLibraryBooks().subscribe({
      next:(data)=>{
      console.log(data)
      if(data){
       this.books = data;
       this.backupData = JSON.parse(JSON.stringify(data))
       this.toastrService.success('Fetch library books')
      }
    },
    error:(error)=>{
      console.log(error)
      this.toastrService.error(error?.message)
    }
  })
  }


  edit(book:any)
  {
    const payload = [];
    payload.push(book)
    this.apiService.saveChanges(payload).subscribe({
      next:(data)=>{
      console.log(data)
      alert('saved changes')
    },
    error:(error)=>{
      console.log(error)
      this.toastrService.error(error?.message)
    }
  })
  }

  save()
  {
    const payload = this.savePayload.map(result=>result.data)
    console.log(payload)
    this.apiService.saveChanges(payload).subscribe({
      next:(data)=>{
      console.log(data)
      this.savePayload = []
      this.toastrService.success('Changes save successullly')
    },
    error:(error)=>{
      console.log(error)
      this.toastrService.error(error?.message)
    }
  })
  }

  delete(book?:any)
  {
    let payload = [];
    if(book)
    {
      payload.push(book?.bookId)
    }
    else
    {
      this.gridApi?.getSelectedRows().forEach(data=>payload.push(data?.bookId));
    }
    this.apiService.deleteBook(payload).subscribe({
      next:(data)=>{
      console.log(data)
      this.getBooks()
      this.toastrService.success('Selected books deleted.')
    },
    error:(error)=>{
      console.log(error)
      this.toastrService.error(error?.message)
    }
  })
  }

  onCellValueChange(event:any)
  {
  console.log(event)
    this.savePayload = this.savePayload.filter((payload:any)=> (payload.rowIndex !== event.rowIndex))
  this.savePayload.push(event)
  }

  onGridReady(event:any)
  {
console.log(event)
this.gridApi= event?.api
  }

  add()
  {
    if(this.tableView)
    {
      this.gridApi?.applyTransaction({add:[{}]})
    }
  }

  borrow(book?:any)
  {
    const payload:any[] = []
    if(book)
    {
      payload.push({
        bookId : book.bookId,
        userId: this.userId,
        dueDate : null,
        returnDate:null
      })
    }
    else
    {
      const book = this.gridApi?.getSelectedRows() || []
      book.forEach(data=>{
        payload.push({
          bookId : data.bookId,
          userId: this.userId,
          dueDate : null,
          returnDate:null
        })
      })
    }
    if(payload.length>0)
    {
      this.apiService.insertLoanData(payload).subscribe({
        next:(data)=>{
        console.log(data)
        this.getBooks()
        this.toastrService.success('Selected book borrowed.')
      },
      error:(error)=>{
        console.log(error)
        this.toastrService.error(error?.message)
      }
    })
    }
    else
    {
      this.toastrService.error('please select any row')
    }
     
  }

  search()
  {
    if(this.searchText){
      this.apiService.search(this.searchText).subscribe({
        next:(data)=>{
       this.books = data
      },
      error:(error)=>{
        console.log(error)
        this.toastrService.error(error?.message)
      }
    })
    }
    else
    {
      this.getBooks()
    }
  }

  cancel()
  {

    this.gridApi?.setRowData([]);
    console.log(this.backupData)
    this.gridApi?.setRowData(this.backupData)
    this.gridApi?.redrawRows()
  }
   
}
