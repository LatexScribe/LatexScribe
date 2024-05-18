import {Component,OnInit,ViewChild} from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { DocumentsService } from '../../service/documents/documents.service';

interface Tag {
  id: string,
  name: string
}

export interface ProjectData {
  Title: string;
  last_modified: string;
  TagName: string;
  isSelected?: boolean;
  isEdit?: boolean;
}

@Component({
  selector: 'app-project-table',
  templateUrl: './project-table.component.html',
  styleUrl: './project-table.component.css'
})
export class ProjectTableComponent implements OnInit{
  displayedColumns: string[] = ['Select', 'name', 'last_modified', 'tag_id', 'Action'];

  dataSource: MatTableDataSource<ProjectData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  oldTitleObj: any;
  selectAllRows: boolean = false;


  //TAGS
  tags:Tag[]=[];
  tagControl= new FormControl({value: '', disabled: true});
  form = new FormGroup({
    tag: this.tagControl
  });


  documents:any[]=[];
  document:any;

  constructor(private service: DocumentsService) {
    this.dataSource = new MatTableDataSource(this.documents);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getTags();
    this.getDocuments();
  }

  async getTags() {
    try {
      let response = await this.service.getTags();
      this.tags = response.data;

      if (this.tags.length > 0) {
        this.tagControl.setValue(this.tags[0].name);
        this.tagControl.enable(); 
      }

    } catch (error) {
      console.error('Error getting tags:', error);
    }
  }

  // //GET all documents
  async getDocuments(){
    try {
      let response = await this.service.getDocuments();
      console.log(response.data); 
      this.dataSource= new MatTableDataSource(response.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort= this.sort;
    } catch (error) {
      console.error('Error getting documents:', error);
    }
  }

  //DELETE document
  async deleteDocument(id:string){
    try {
      const confirmation = confirm('Are you sure you want to delete?');
      if (confirmation) {
      await this.service.deleteDocument(id);
      }
      this.getDocuments();
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  }

  //GET document by name
  async getDocumentByName(name1: string) {
    try {
      let response = await this.service.getDocumentByName(name1);
      this.document = response.data;
      console.log(response)
    } catch (error) {
      console.error('Error getting document by name:', error);
    }
  }

  //GET document by id
  async getDocumentById(id: string) {
    try {
      let response = await this.service.getDocumentById(id);
      this.document = response.data;
      console.log(response)
    } catch (error) {
      console.error('Error getting document by id:', error);
    }
    }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  selectAll(event: MatCheckboxChange) {
    this.dataSource.data.forEach((row) => (row.isSelected = event.checked));
    this.toggleTagControl();
  }

  toggleTagControl() {
    if (this.hasSelectedRows() && this.tags.length > 0) {
      this.tagControl.enable();
    } else {
      this.tagControl.disable();
    }
  }

  hasSelectedRows(): boolean {
    return this.dataSource.data.some((row) => row.isSelected);
  }

  printSelectedRows() {
    const selectedRows = this.dataSource.data.filter((row) => row.isSelected);
    console.log(selectedRows);
  }

  onUpdate(row: ProjectData){
    // this.service.changeDocument(row.id, row.name, row.size, row.lastModified, row.content, row.template, row.tag);
  }

  onEdit(TitleObj: any) {
    this.oldTitleObj = JSON.stringify(TitleObj);
    this.dataSource.data.forEach((element) => {
      element.isEdit = false;
    });
    TitleObj.isEdit = true;
  }

  onCancel(titleObj: any) {
    const oldObj = JSON.parse(this.oldTitleObj);
    titleObj.name = oldObj.name;
    titleObj.isEdit = false;
  }


}
