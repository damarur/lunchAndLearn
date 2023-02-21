import {Component, OnInit} from '@angular/core';
import {Platform} from '@ionic/angular';
import {Camera, GalleryPhoto, GalleryPhotos} from '@capacitor/camera';
import {Filesystem, ReadFileResult} from '@capacitor/filesystem';
import {isMobile} from '../util/platform/platform.util';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  public imagesInBase64 = [];
  public imagesUrl = [];

  constructor(private readonly platform: Platform) {
    if (isMobile(this.platform)) {
      Camera.requestPermissions();
    }
  }

  ngOnInit(): void {
    this.imagesInBase64 = [];
    this.imagesUrl = [];
  }

  async choosePictures() {
    this.ngOnInit();
    await Camera.pickImages({
      quality: 90,
      width: 600,
      height: 600,
      correctOrientation: true,
      limit: 3
    }).then((galleryPhotos: GalleryPhotos) => {
      galleryPhotos.photos.forEach((photo: GalleryPhoto) => {
        console.log(photo);
        if (isMobile(this.platform)) {
          this.readFile(photo.path);
        } else {
          this.imagesUrl.push(photo.webPath);
        }
      })
    });
  }

  readFile(path: string) {
    Filesystem.readFile({path}).then((file: ReadFileResult) => {
      this.imagesInBase64.push('data:image/jpeg;base64,' + file.data);
    });
  }
}
