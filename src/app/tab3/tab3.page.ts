import {Component} from '@angular/core';
import {Platform} from '@ionic/angular';
import {Camera, GalleryPhoto, GalleryPhotos} from '@capacitor/camera';
import {Filesystem, ReadFileResult} from '@capacitor/filesystem';
import {isMobile} from '../util/platform/platform.util';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  public imagesInBase64 = [];

  constructor(private readonly platform: Platform) {
    if (isMobile(this.platform)) {
      Camera.requestPermissions();
    }
  }

  async choosePictures() {
    this.imagesInBase64 = [];
    await Camera.pickImages({
      quality: 90,
      width: 600,
      height: 600,
      correctOrientation: true,
      limit: 3
    }).then((galleryPhotos: GalleryPhotos) => {
      galleryPhotos.photos.forEach((photo: GalleryPhoto) => {
        console.log(photo);
        this.readFile(photo.path);
      })
    });
  }

  readFile(path: string) {
    Filesystem.readFile({path}).then((file: ReadFileResult) => {
      this.imagesInBase64.push('data:image/jpeg;base64,' + file.data);
    });
  }
}
