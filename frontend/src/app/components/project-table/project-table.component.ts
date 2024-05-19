import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { DocumentsService } from '../../service/documents/documents.service';
import { ProjectData } from '../../models/project-data';
import { ProjectDataExtended } from '../../models/project-data-extended';
import { Customdoc } from '../../models/customdoc.model';

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

  dataSource: MatTableDataSource<ProjectDataExtended>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  documentsList: ProjectDataExtended[] = [];
  documents: any = [];

  oldTitleObj: any;
  selectAllRows: boolean = false;

  //TAGS
  tags: Tag[] = [];
  tagControl = new FormControl(  '', [Validators.required] );
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
    

    //this.service.createDocument("documentname.tex",103,"2024-04-04T07:32:39", "VGVzdGluZwo=", null,null);

    this.service.getDocuments().then((docs: ProjectDataExtended[]) => {
      this.documentsList = docs;
      console.log("Initialization")
      console.log(this.documentsList)

      this.dataSource= new MatTableDataSource(this.documentsList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort= this.sort;
    });
  }

  changeTagsOfSelectedRows(){
    console.log("tag changed");
    const selectedTagName=this.tagControl.value;
    const selectedTag = this.tags.find(tag => tag.name === selectedTagName); 
    const selectedTagId=selectedTag?.id;

    const selectedRows = this.dataSource.data.filter((row) => row.isSelected);
 
    selectedRows.forEach((row) => {
      for(let i=0;i<this.documentsList.length;i++){
        if(this.documentsList[i].id==row.id){
          this.documentsList[i].tag_id=(selectedTagId)? selectedTagId:null;
          this.documentsList[i].tag_name=selectedTag?.name;

          this.service.changeDocumentTest(this.documentsList[i].id,
            this.documentsList[i]?.Title,
            this.documentsList[i]?.size,
            this.documentsList[i]?.lastModified,
            this.documentsList[i]?.content,
            (this.documentsList[i]?.template_id) ? Number(this.documentsList[i]?.template_id) : null,
            Number(selectedTagId));
           
        }

      }
    }
  )
  this.dataSource= new MatTableDataSource(this.documentsList);

  console.log("updated");
  console.log(this.dataSource.data);
    this.unselectAll();
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
  // async getDocuments2(){
  //   try {
  //     let response = await this.service.getDocuments2();
  //     console.log("this is the changed response");
  //     console.log(response.data.length);

  //     let projectDataArray: ProjectDataExtended[] = [];
      
  //     for(let i=0; i< response.data.length;i++ ){
  //      const entry=new ProjectDataExtended(response.data[i].id,
  //         response.data[i].name,
  //         response.data[i].size,
  //         response.data[i].lastModified,
  //         response.data[i].content,
  //        (response.data[i].template!=null)? response.data[i].template.id:null,
  //        (response.data[i].tag!=null)? response.data[i].tag.id: null)


  //        entry.tag_name=(response.data[i].tag!=null)? response.data[i].tag.name :null;
  //        projectDataArray.push(entry);

  //     }

  //     console.log("----project data arr");
  //     console.log(projectDataArray);
      

  //     this.dataSource= new MatTableDataSource(projectDataArray);
  //     this.dataSource.paginator = this.paginator;
  //     this.dataSource.sort= this.sort;
  //   } catch (error) {
  //     console.error('Error getting documents:', error);
  //   }
  // }


  //DELETE document
  async deleteDocument(id: string) {
    try {
      const confirmation = confirm('Are you sure you want to delete?');
      if (confirmation) {
        await this.service.deleteDocument(id);
      }
      // this.getDocuments2();
      this.documentsList=this.documentsList.filter(doc=>doc.id!== id);
      console.log("after delete");
     
      console.log(this.documentsList)
      this.dataSource= new MatTableDataSource(this.documentsList);

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
  // async getDocumentById(id: string) {
  //   try {
  //     let response = await this.service.getDocumentById(id);
  //     this.document = response.data;
  //     const doc: ProjectDataExtended = response.data.map((item: any) => {
  //       return new ProjectDataExtended(
  //         item.id,
  //         item.name,
  //         item.size,
  //         item.last_modified,
  //         item.content,
  //         item.template,
  //         item.tag
  //       );
  //     });
  //   } catch (error) {
  //     console.error('Error getting document by id:', error);
  //   }
  // }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  selectAll(event: MatCheckboxChange) {
    this.dataSource.data.forEach((row) => (row.isSelected = event.checked));
  
  }
  unselectAll(){
    this.dataSource.data.forEach((row) => (row.isSelected = false));

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
        this.service.changeDocumentTest(
          row.id,
          row.name,
          this.documentsList[doc].size,
          this.documentsList[doc].lastModified,
          this.documentsList[doc].content,
          (this.documentsList[doc].template_id==null)? null: Number(this.documentsList[doc].template_id),
          row.tag_id
        );
        this.documentsList[doc].Title = row.name;
        this.documentsList[doc].tag_id = row.tag_id;
        this.documentsList[doc].size = row.size;
      }
    }
    console.log(this.documentsList);
    row.isEdit=false;
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
