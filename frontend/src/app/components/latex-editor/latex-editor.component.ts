import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnInit,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { CodemirrorComponent } from '@ctrl/ngx-codemirror';
import { DocumentsService } from '../../service/documents/documents.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { format } from 'date-fns';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';

// @ts-ignore
const generator = new window.latexjs.HtmlGenerator({
  hyphenate: true,
  languagePatterns: en,
  styles: [],
});

var scrollY = 0;

// @ts-ignore
function links() {
  var as: any = document.getElementsByTagName('a');
  for (var i = 0; i < as.length; i++) {
    if (as[i].getAttribute('href').startsWith('#')) {
      // @ts-ignore
      as[i].addEventListener('click', function (ev: any) {
        ev.preventDefault();
        var target = ev.target.getAttribute('href').substr(1);
        var te = document.getElementById(target);

        // @ts-ignore
        document.scrollingElement!.scrollTop = te?.offsetTop;
      });
    }
  }
}

/* function to compile latex source into the given iframe */
// @ts-ignore
function compile(latex, iframe) {
  var doc = iframe.contentDocument;

  if (doc.readyState !== 'complete') return;

  try {
    generator.reset();
    // @ts-ignore
    var newDoc = window.latexjs
      .parse(latex, { generator: generator })
      .htmlDocument('https://cdn.jsdelivr.net/npm/latex.js/dist/');

    // we need to disable normal processing of same-page links in the iframe
    // see also https://stackoverflow.com/questions/50657574/iframe-with-srcdoc-same-page-links-load-the-parent-page-in-the-frame
    var linkScript = newDoc.createElement('script');
    linkScript.text =
      'document.addEventListener("DOMContentLoaded", ' + links.toString() + ')';
    newDoc.head.appendChild(linkScript);

    // don't reload all the styles and fonts if not needed!
    if (doc.head.innerHTML == newDoc.head.innerHTML) {
      var newBody = doc.adoptNode(newDoc.body);
      doc.documentElement.replaceChild(newBody, doc.body);
      doc.documentElement.style.cssText = newDoc.documentElement.style.cssText;
    } else {
      iframe.srcdoc = newDoc.documentElement.outerHTML;

      // var blob = new Blob([newDoc.documentElement.innerHTML], {type : 'text/html'});
      // iframe.src = URL.createObjectURL(blob);
    }

    if (scrollY) {
      iframe.contentWindow.scrollTo(0, scrollY);
      scrollY = 0;
    }
  } catch (e: any) {
    console.error(e);

    // save scrolling position and restore on next successful compile
    if (!scrollY) scrollY = iframe.contentWindow.pageYOffset;

    // @ts-ignore
    if (e instanceof window.latexjs.SyntaxError) {
      var error = {
        // @ts-ignore
        line: definedOrElse(e.location.start.line, 0),
        // @ts-ignore
        column: definedOrElse(e.location.start.column, 0),
        message: e.message,
        // @ts-ignore
        found: definedOrElse(e.found, ''),
        // @ts-ignore
        expected: definedOrElse(e.expected, ''),
        // @ts-ignore
        location: excerpt(
          latex,
          // @ts-ignore
          definedOrElse(e.location.start.offset, 0)
        ),
      };

      doc.body.innerHTML =
        '<pre class="error">ERROR: Parsing failure:\n\n' +
        errorMessage(error, true) +
        '</pre>';
    } else {
      doc.body.innerHTML = '<pre class="error">ERROR: ' + e.message + '</pre>';
    }
  }
}

// @ts-ignore
function definedOrElse(value, fallback) {
  return typeof value !== 'undefined' ? value : fallback;
}

/* utility function: create a source excerpt */
// @ts-ignore
function excerpt(txt, o) {
  var l = txt.length;
  var b = o - 20;
  if (b < 0) b = 0;
  var e = o + 20;
  if (e > l) e = l;
  var hex = function (ch: any) {
    return ch.charCodeAt(0).toString(16).toUpperCase();
  };
  // @ts-ignore
  var extract = function (txt, pos, len) {
    return txt
      .substr(pos, len)
      .replace(/\\/g, '\\\\')
      .replace(/\x08/g, '\\b')
      .replace(/\t/g, '\\t')
      .replace(/\n/g, '\\n')
      .replace(/\f/g, '\\f')
      .replace(/\r/g, '\\r')
      .replace(/[\x00-\x07\x0B\x0E\x0F]/g, function (ch: any) {
        return '\\x0' + hex(ch);
      })
      .replace(/[\x10-\x1F\x80-\xFF]/g, function (ch: any) {
        return '\\x' + hex(ch);
      })
      .replace(/[\u0100-\u0FFF]/g, function (ch: any) {
        return '\\u0' + hex(ch);
      })
      .replace(/[\u1000-\uFFFF]/g, function (ch: any) {
        return '\\u' + hex(ch);
      });
  };
  return {
    prolog: extract(txt, b, o - b),
    token: extract(txt, o, 1),
    epilog: extract(txt, o + 1, e - (o + 1)),
  };
}

/* render a useful error message */
// @ts-ignore
function errorMessage(e, noFinalNewline) {
  var l = e.location;
  var prefix1 = 'line ' + e.line + ' (column ' + e.column + '): ';
  var prefix2 = '';
  for (var i = 0; i < prefix1.length + l.prolog.length; i++) prefix2 += '-';
  var msg =
    prefix1 +
    l.prolog +
    l.token +
    l.epilog +
    '\n' +
    prefix2 +
    '^' +
    '\n' +
    e.message +
    (noFinalNewline ? '' : '\n');

  return msg;
}

@Component({
  selector: 'app-latex-editor',
  templateUrl: './latex-editor.component.html',
  styleUrl: './latex-editor.component.css',
})
export class LatexEditorComponent implements OnInit, AfterViewInit {
  @ViewChild('codemirror') codeMirror!: CodemirrorComponent;

  formGroup!: FormGroup;
  name: string = 'Initial Project Name';
  isEdit: boolean = false;
  editExistingDocFlag: boolean=false;
  selectedProject: Customdoc|undefined;

  
  content: string = 'Hello';

  @ViewChild('preview') preview!: ElementRef;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,
    private documentService: DocumentsService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
  
  ) {
  }


  updatePreviewOnKeyUp(event:any){
    this.updatePreview();
  }

  ngOnInit(): void {

    this.formGroup = this.fb.group({
      documentName: [this.name],
    });
  }

  onUpdate():void{
    this.name = this.formGroup.get('documentName')?.value;
    this.isEdit = false;
    //call the API for editing
  }

  onEdit():void {
    this.isEdit = true;
    this.formGroup.get('documentName')?.setValue(this.name);
  }

  onCancel():void {
    this.isEdit = false;
    this.formGroup.get('documentName')?.setValue(this.name);
  }

  ngAfterViewInit(): void {
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
          
        const id = Number(this.route.snapshot.paramMap.get('id'));
        if (id) {
          this.documentService.getDocumentByIdG(id).then(item => {
            this.selectedProject = item;
            this.editExistingDocFlag = true;
            console.log("the element: ")
            console.log(this.document.getElementById("document_name"));

            this.name = this.selectedProject.name;
            this.formGroup.get('documentName')?.setValue(this.name);


            if (this.selectedProject?.content) {
              this.codeMirror.writeValue(this.decodeFromBase64(this.selectedProject.content));
              this.updatePreview();
            }


          });
        }

        // this.codeMirror.value=`adh`;
        console.log("the content is");
        console.log(this.selectedProject?.content);
        if(this.selectedProject?.content){
          console.log(this.selectedProject.content);
          this.codeMirror.writeValue(this.decodeFromBase64(this.selectedProject.content));
          this.updatePreview();
        }
        console.log("the end");
        
        
        // const event = new KeyboardEvent('keyup', {
        //   key: 'ArrowUp', // or 'ArrowDown', 'ArrowLeft', 'ArrowRight'
        //   code: 'ArrowUp', // Optional: You can also specify the code property
        //   bubbles: true
        // });
        
        // console.log("eve");
        // console.log(this.document.getElementById("target")as HTMLElement);
        // ((this.document.getElementById("target"))as HTMLElement ).dispatchEvent(event);

        
      }

      
    }
  }


  updatePreview() {
    let latexInput = this.codeMirror.codeMirror?.getValue();
    if(latexInput==undefined && this.selectedProject?.content )
      latexInput=this.decodeFromBase64(this.selectedProject?.content);
    console.log('Hello:::::', latexInput, window);
    
      try {
        let latexPreview = this.document.getElementById('preview');
        console.log('Updated', latexInput, latexPreview);
        compile(latexInput, latexPreview);
      } catch (error) {
        console.error('Error rendering LaTeX:', error);
      }
  }

  updateContent() {
    const latexInput = this.codeMirror.codeMirror?.getValue();
    if (latexInput) {
      // var html = katex.renderToString(latexInput?.toString());
      this.content = latexInput;
      console.log(this.content);
    }
  }


  editDocument(){
    const name :string = this.formGroup.get('documentName')?.value;

    if(this.selectedProject!=null)
    this.documentService.changeDocumentTest(this.selectedProject.id,
     (name.trim().length>0)? name: "Untitled",
      this.selectedProject?.size,
      this.selectedProject?.lastModified,
    this.exampleEncode(),
    (this.selectedProject.template_id)? Number(this.selectedProject.template_id):null,
    (this.selectedProject.tag_id)? Number(this.selectedProject.tag_id):null,);
    

  }

  async saveDocument() {
    try {
    const name = this.formGroup.get('documentName')?.value;
    const content = this.exampleEncode();
    const date = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss");
    this.documentService.createDocument(name,content.length,date,content,null,null);
     } catch (error) {
  console.error('Error creating document:', error);
     }
  }

  encodeToBase64(str: string): string {
    return btoa(str);
  }

  decodeFromBase64(encodedStr: string): string {
    return atob(encodedStr);
  }

  exampleEncode() {
    const latexInput = this.codeMirror.codeMirror?.getValue();
    let encodedString='';
    if(latexInput){
      encodedString = this.encodeToBase64(latexInput);
    }
    return encodedString;
  }

  exampleEncodeDecode(base64encodedString:string) {
    const latexInput = this.codeMirror.codeMirror?.getValue();
    let decodedString='';
    if(latexInput){
      decodedString = this.decodeFromBase64(base64encodedString);
    }
    return decodedString;
  }
}
// webpack doesn't handle import.meta.url yet, so don't use latex.mjs
// @ts-ignore
// import { parse, HtmlGenerator, SyntaxError } from 'latex.js'
// @ts-ignore
import en from 'hyphenation.en-us';
import { Customdoc } from '../../models/customdoc.model';

