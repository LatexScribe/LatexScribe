export class ProjectDataExtended {
        id: string = '';
        Title: string = '';
        size: string | null = null;
        lastModified: string = '';
        content: string='';
        tag_id: string | null='';
        template_id:string='';
        isSelected?: boolean;
        isEdit?: boolean;
        tag_name?:string;
      
        constructor(
          id: string,
          name: string,

          size: string | null,
          lastModified: string,
          content:string,
          template:string,
          tag_id: string,
          tag_name:string
        ) {
          this.id = id;
          this.size = size;
          this.Title = name;
          this.lastModified = lastModified;
          this.content=content;
          this.tag_id=tag_id;
          this.template_id=template;
          this.tag_name=tag_name
        }
}


