import katex from 'katex';
import {AfterViewInit,Component,ElementRef,Inject,OnInit,PLATFORM_ID,ViewChild, Input} from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { CodemirrorComponent } from '@ctrl/ngx-codemirror';
import { DocumentsService } from '../../service/documents/documents.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-latex-editor',
  templateUrl: './latex-editor.component.html',
  styleUrl: './latex-editor.component.css'
})

export class LatexEditorComponent implements OnInit, AfterViewInit {
  @ViewChild('codemirror') codeMirror!: CodemirrorComponent;

  formGroup!: FormGroup;


  content: string = 'Hello';

  @ViewChild('preview') preview!: ElementRef;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,
    private documentService:DocumentsService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      documentName: ['']
    });
  }

  ngAfterViewInit(): void {
    // const katex = require('katex');
    var html = katex.renderToString(`\begin{abstract}This document will show most of the features of \LaTeX.js while at the same time being a gentle introduction to \LaTeX.\end{abstract}`, {
      throwOnError: false
  }); 
  console.log("here it is->")
  console.log(html);
    if (typeof window != undefined) {
      if (isPlatformBrowser(this.platformId)) {
        import('codemirror')
          .then((CodeMirror) => {
            const codeElement = this.document.getElementById(
              'code'
            ) as HTMLTextAreaElement;
            if (codeElement) {
              CodeMirror.fromTextArea(codeElement, {
                lineNumbers: true,
                lineWrapping: true,
                
              });
            }
          })
          .catch((error) => {
            console.error('Error loading CodeMirror:', error);
          });
      }
    }
  }


  updatePreview() {
    const latexInput = this.codeMirror.codeMirror?.getValue();
    if (latexInput) {
      const previewElement = this.preview.nativeElement;
      previewElement.innerHTML = ''; 
      try {
        katex.render(latexInput, previewElement, {
          throwOnError: false,
        });
      } catch (error) {
        console.error('Error rendering LaTeX:', error);
      }
  }
}

updateContent() {
  const latexInput = this.codeMirror.codeMirror?.getValue();
  if(latexInput){
      // var html = katex.renderToString(latexInput?.toString());
      this.content = latexInput;
      console.log(this.content);
  }
}

async saveDocument() {
  // try {
    const name = this.formGroup.get('documentName')?.value;
    const content = 
    console.log(name)
    //const documentId = await this.documentService.createDocument();
    //  console.log('Document created successfully. ID:', documentId);
    //  return documentId;
  // } catch (error) {
  //   console.error('Error creating document:', error);
  //   return null;
  // }
}

encodeToBase64(str: string): string {
  return btoa(str);
}

decodeFromBase64(encodedStr: string): string {
  return atob(encodedStr);
}

exampleEncode() {
  const katexString = '$f^2(x)+2f(x)+c$';
  const encodedString = this.encodeToBase64(katexString);
  console.log('Encoded String:', encodedString);
}

exampleEncodeDecode() {
  const katexString = 'This document etc etc $f^2(x)+2f(x)+c$ etc';
  const encodedString = this.encodeToBase64(katexString);
  console.log('Encoded String:', encodedString);

  const decodedString = this.decodeFromBase64(encodedString);
  console.log('Decoded String:', decodedString);
}


} 