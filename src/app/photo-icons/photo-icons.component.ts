import {Component, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatToolbar} from "@angular/material/toolbar";
import {NavigationEnd, Router, RouterLink, RouterOutlet} from "@angular/router";
import {PhotoUploadService} from "../photo-upload.service";
import {PhotoListResponse, Photo} from "../thumbnail";
import {ThumbnailComponent} from "../thumbnail/thumbnail.component";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-photo-icons',
  standalone: true,
  imports: [
    MatButton,
    MatToolbar,
    RouterOutlet,
    RouterLink,
    ThumbnailComponent,
    NgForOf
  ],
  templateUrl: './photo-icons.component.html',
  styleUrl: './photo-icons.component.css'
})
export class PhotoIconsComponent implements OnInit {

  thumbnails : Photo[] = [];
  id(index: number,photo: Photo){
    return photo.id;
  }

  constructor(private photoUploadService: PhotoUploadService,private router:Router) {
    router.events.subscribe((event)=>{
      if (event instanceof NavigationEnd){
        this.refresh()
      }
    })
  }

  ngOnInit(){
    this.refresh();
  }

  private refresh() {
    this.photoUploadService.getThumbnails().subscribe((r: PhotoListResponse) => {
      console.log("response:",r);
      let photos = r.photos.filter((elem) => elem.thumbnail != null);
      console.log(photos);
      this.thumbnails = photos
      console.log("thumbnails:",this.thumbnails);
    })
  }
}
