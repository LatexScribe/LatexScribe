export class ProjectDataExtended {
        id: string = '';
        Title: string = '';
        size: string | null = null;
        lastModified: string = '';
        content: string='';
        tag_id: string | null='';
        template_id:string='';
      
        constructor(
          id: string,
          name: string,

          size: string | null,
          lastModified: string,
          content:string,
          template:string,
          tag: string,
        ) {
          this.id = id;
          this.size = size;
          this.Title = name;
          this.lastModified = lastModified;
          this.content=content;
          this.tag_id=tag;
          this.template_id=template;
        }
}


