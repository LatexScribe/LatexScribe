import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { DocumentsService } from '../../service/documents/documents.service';
import { ProjectData } from '../../models/project-data';
import { ProjectDataExtended } from '../../models/project-data-extended';

interface Tag {
  id: string;
  name: string;
}

@Component({
  selector: 'app-project-table',
  templateUrl: './project-table.component.html',
  styleUrl: './project-table.component.css',
})
export class ProjectTableComponent implements OnInit {
  displayedColumns: string[] = [
    'Select',
    'id',
    'name',
    'last_modified',
    'tag_id',
    'Action',
  ];

  dataSource: MatTableDataSource<ProjectData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  documentsList: ProjectDataExtended[] = [];
  documents: any = [];

  oldTitleObj: any;
  selectAllRows: boolean = false;

  //TAGS
  tags: Tag[] = [];
  tagControl = new FormControl({ value: '', disabled: true });
  form = new FormGroup({
    tag: this.tagControl,
  });

  document: any;

  constructor(private service: DocumentsService) {
    this.dataSource = new MatTableDataSource(this.documents);
  
    console.log("Talia documents:"+this.documents);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getTags();
    this.getDocuments2();

    //this.service.createDocument("documentname.tex",103,"2024-04-04T07:32:39", "VGVzdGluZwo=", null,null);

    this.service.getDocuments().then((docs: ProjectDataExtended[]) => {
      this.documentsList = docs;
      console.log("Initialization")
      console.log(this.documentsList)
    });
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

  //GET all documents
  async getDocuments2(){
    try {
      let response = await this.service.getDocuments2();
      this.dataSource= new MatTableDataSource(response.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort= this.sort;
    } catch (error) {
      console.error('Error getting documents:', error);
    }
  }


  //DELETE document
  async deleteDocument(id: string) {
    try {
      const confirmation = confirm('Are you sure you want to delete?');
      if (confirmation) {
        await this.service.deleteDocument(id);
      }
      this.getDocuments2();
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  }

  //GET document by name
  async getDocumentByName(name1: string) {
    try {
      let response = await this.service.getDocumentByName(name1);
      this.document = response.data;
      console.log(response);
    } catch (error) {
      console.error('Error getting document by name:', error);
    }
  }

  //GET document by id
  async getDocumentById(id: string) {
    try {
      let response = await this.service.getDocumentById(id);
      this.document = response.data;
      const doc: ProjectDataExtended = response.data.map((item: any) => {
        return new ProjectDataExtended(
          item.id,
          item.name,
          item.size,
          item.last_modified,
          item.content,
          item.template,
          item.tag
        );
      });
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

  onUpdate(row: any) {
    for (let doc in this.documentsList) {
      console.log("DOC"+doc);
      console.log("On Update:",row.name)
      console.log(row.tag_id)
      console.log(row.size)
      console.log(this.documentsList)
      if (this.documentsList[doc].id == row.id) {
        this.service.changeDocument(
          row.id,
          row.name,
          this.documentsList[doc].size,
          this.documentsList[doc].lastModified,
          this.documentsList[doc].content,
          this.documentsList[doc].template_id,
          row.tag_id
        );
        this.documentsList[doc].Title = row.name;
        this.documentsList[doc].tag_id = "1n";
        this.documentsList[doc].size = row.size;
      }
    }
    console.log(this.documentsList);
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
