import { Component, OnInit } from '@angular/core';
import { Template } from '../../models/template.model';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentsService } from '../../service/documents/documents.service';

@Component({
  selector: 'app-selected-template-page',
  templateUrl: './selected-template-page.component.html',
  styleUrl: './selected-template-page.component.css'
})
export class SelectedTemplatePageComponent implements OnInit{

  selectedTemplate: Template|undefined;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private service: DocumentsService) {
}

ngOnInit(): void {

  this.selectedTemplate=new Template("123","Book template",15,"This is the content","BOOK","45USER4");
  // const id = Number(this.route.snapshot.paramMap.get('id'));
  // if (id) {
  //  this.service.getTemplate(id).then(item=>this.selectedTemplate=item);
  // }
}

onBack(): void {
  this.router.navigate(['/templates']);
}



}
