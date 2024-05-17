import katex from 'katex';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnInit,
  PLATFORM_ID,
  ViewChild,
  Input,
} from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { CodemirrorComponent } from '@ctrl/ngx-codemirror';
import { DocumentsService } from '../../service/documents/documents.service';
import { FormBuilder, FormGroup } from '@angular/forms';

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

  content: string = 'Hello';

  @ViewChild('preview') preview!: ElementRef;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,
    private documentService: DocumentsService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      documentName: [''],
    });
  }

  ngAfterViewInit(): void {
    // // const katex = require('katex');
    // var html = katex.renderToString(
    //   `\begin{abstract}This document will show most of the features of \LaTeX.js while at the same time being a gentle introduction to \LaTeX.\end{abstract}`,
    //   {
    //     throwOnError: false,
    //   }
    // );
    // console.log('here it is->');
    // console.log(html);
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
    console.log('Hello:::::', latexInput, window);
    if (latexInput) {
      // const previewElement = this.preview.nativeElement;
      // previewElement.innerHTML = '';
      try {
        // katex.render(latexInput, previewElement, {
        //   throwOnError: false,
        // });

        let latexPreview = this.document.getElementById('preview');
        console.log('Updated', latexInput, latexPreview);
        compile(latexInput, latexPreview);
      } catch (error) {
        console.error('Error rendering LaTeX:', error);
      }
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

  async saveDocument() {
    // try {
    const name = this.formGroup.get('documentName')?.value;
    const content = console.log(name);
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

// webpack doesn't handle import.meta.url yet, so don't use latex.mjs
// @ts-ignore
// import { parse, HtmlGenerator, SyntaxError } from 'latex.js'
// @ts-ignore
import en from 'hyphenation.en-us';