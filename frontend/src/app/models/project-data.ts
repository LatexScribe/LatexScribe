export class ProjectData {
    id: string = '';
    size: string | null = null;
    name: string = '';
    last_modified: string = '';
    tag_id: string = '';
    isSelected?: boolean;
    isEdit?: boolean;
  
    constructor(
      id: string,
      size: string | null,
      name: string,
      last_modified: string,
      TagName: string
    ) {
      this.id = id;
      this.size = size;
      this.name = name;
      this.last_modified = last_modified;
      this.tag_id = TagName;
    }
  }

 export interface ProjectDataInterface {
    id?: string;
    size?: string | null;
    name?: string;
    last_modified?: string;
    TagName?: string;
    isSelected?: boolean;
    isEdit?: boolean;
  }
  