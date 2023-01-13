import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { YouTubeVideo } from '../models/youtube-video';
import { YoutubeCategory } from '../models/youTubeCategory';
import { CategoryPoint } from './category-point';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class YoutubeVideoService {

  constructor(private httpClient: HttpClient, public appResourceService: ConfigService) {
  }

  getYoutubeVideoByCompanyId(companyId: number, userId: number) {
    let url = this.appResourceService.configValue.listenPayUrl + "YouTubeVideo/GetYouTubeVideosByCompanyAndUserId?companyId=" + companyId + "&UserId=" + userId;
    return this.httpClient.get<YouTubeVideo[]>(url);
  }
  getCategoryPointByCompanyIdUserId(companyId: number, userId: number) {
    let url = this.appResourceService.configValue.listenPayUrl + "YouTubeVideo/GetCategoryPointsByCompanyAndUserId?companyId=" + companyId + "&UserId=" + userId;
    return this.httpClient.get<CategoryPoint[]>(url);
  }

  public getAllYoutubeVideosPointsPercent(companyId: number, userId: number) {

    return this.getYoutubeVideoByCompanyId(companyId, userId).pipe(map((youTubeVideos: YouTubeVideo[]) => {
      let points = this.appResourceService.appCategories.reduce((currentValue, cat) => { return currentValue + this.getAllCategoriesPointsInPercent(youTubeVideos, cat.value) }, 0);
      return points / this.appResourceService.appCategories.length;
    }));
  }

  private getAllCategoriesPointsInPercent(youtubeVideos: YouTubeVideo[], categoryTitle: string) {
    let tempYoutubes: YouTubeVideo[] = youtubeVideos.filter(x => x.relatedCategories.some(c => c.title.toLowerCase().trim() == categoryTitle.toLowerCase().trim()));
    let count = tempYoutubes.length * 100;
    if(!count || count==NaN || count==0)
    {
      return 0;
    }
    let allVideoWatchTime = tempYoutubes.reduce((currentValue, b) => currentValue + b.watchTimeStatus, 0.0);
    return (allVideoWatchTime / count) * 100;
  }

  public getAllCategoriesPoints(companyId: number, userId: number) {
    return this.getYoutubeVideoByCompanyId(companyId, userId).pipe(map((youTubeVideos: YouTubeVideo[]) => {

      return this.appResourceService.appCategories.reduce((currentValue, cat) => { return currentValue + this.getCategoryPoints(youTubeVideos, cat.value) }, 0);
    }));
  }

  private getCategoryPoints(youtubeVideos: YouTubeVideo[], categoryTitle: string) {
    let tempYoutubes: YouTubeVideo[] = youtubeVideos.filter(x => x.relatedCategories.some(c => c.title.toLowerCase().trim() == categoryTitle.toLowerCase().trim()));
    return tempYoutubes.reduce((currentValue, b) => currentValue + b.watchTimeStatus, 0.0);
  }


  getCompanyRelatedYouTubeCategory(companyId: number) {
    let url = this.appResourceService.configValue.listenPayUrl + "YouTubeCategory/GetYouTubeCategoriesByCompanyId?companyId=" + companyId;
    return this.httpClient.get<YoutubeCategory[]>(url);
  }
  addUpdateVideoWatchTimeByUser(companyId: number, userId: number, youTubeVideoId: number, watchTimeInSeconds: number, videoDuration: number) {
    let url = this.appResourceService.configValue.listenPayUrl + "ActivityLog/AddUserVideoWatchTime";
    let body = {
      CompanyId: companyId,
      UserId: userId,
      YouTubeVideoId: youTubeVideoId,
      WatchTimeInSecond: watchTimeInSeconds,
      VideoDuration: videoDuration
    }
    return this.httpClient.post(url, body);
  }
}
