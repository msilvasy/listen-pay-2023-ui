export class YoutubeCategory {
  public id: number;
  public youTubeVideoCategoryId: number;
  public title: string;
  public value: string;
  public points: number;
  public disabled: boolean = false;
  public companyRelatedCategoryId: number;

  public backgroundURL: string;
  public done: boolean;
  public gotoRoute:string;
  constructor(id: number = 0, title: string = "", description: string = "", disabled: boolean = false) {
    this.youTubeVideoCategoryId = id;
    this.title = title;
    this.value = description;
    this.disabled = disabled
  }
}


