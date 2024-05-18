export class ProjectDataExtended {
        id: string = '';
        Title: string = '';
        size: string | null = null;
        last_modified: string = '';
        content: string='';
        tag_id: string = '';
        template_id:string='';
      
        constructor(
          id: string,
          name: string,

          size: string | null,
          last_modified: string,
          content:string,
          template:string,
          tag: string,
        ) {
          this.id = id;
          this.size = size;
          this.Title = name;
          this.last_modified = last_modified;
          this.content=content;
          this.tag_id=tag;
          this.template_id=template;
        }
}


