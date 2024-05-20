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
  
  const id = Number(this.route.snapshot.paramMap.get('id'));
  if (id) {
   this.service.getTemplate(id).then(item=>this.selectedTemplate=item);
  }
}

onBack(): void {
  this.router.navigate(['/templates']);
}

openAsTemplate(){
  console.log("opeb as templste the id is "+this.selectedTemplate?.id)
  if(this.selectedTemplate?.id!=undefined){
   const templateId= this.service.createDocumentFromTemplate(this.selectedTemplate?.id)
  

   templateId.then(tempId=>{
    console.log("the result is");
    console.log(tempId);
    this.router.navigate(['/selectedProject', tempId]);

   })

  }
}
openPdf(){
  const url=`http://localhost:8080/public/templates/${this.selectedTemplate?.codeName}/source.pdf`;//"http://localhost:8080/public/templates/RESUME/Jakes_Resume/image.jpg"; //"http://localhost:4200/public/templates/RESUME/Jakes_Resume/source.pdf"
  console.log("yes")
  window.open(url);
}



}
