import {Component} from '@angular/core';
import {Platform} from '@ionic/angular';
import {
  BatteryInfo,
  Device,
  DeviceId,
  DeviceInfo,
  GetLanguageCodeResult,
  LanguageTag
} from '@capacitor/device';
import {Geolocation, Position} from '@capacitor/geolocation';
import {ConnectionStatus, Network} from '@capacitor/network';
import {isMobile} from '../util/platform/platform.util';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public device: DeviceInfo;
  public deviceId: DeviceId;
  public battery: BatteryInfo;
  public geolocation: Position;
  public languageCode: GetLanguageCodeResult;
  public languageTag: LanguageTag;
  public connectionStatus: ConnectionStatus;

  constructor(private readonly platform: Platform) {
    this.logDeviceInfo();
    this.logGeolocation();
    this.logNetwork();
  }

  public logDeviceInfo() {
    Device.getInfo().then(deviceInfo => {
      console.log(deviceInfo);
      this.device = deviceInfo;
    });
    Device.getId().then(deviceId => {
      console.log(deviceId);
      this.deviceId = deviceId;
    })
    Device.getBatteryInfo().then(batteryInfo => {
      console.log(batteryInfo);
      this.battery = batteryInfo;
    });
    Device.getLanguageCode().then(languageCode => {
      console.log(languageCode);
      this.languageCode = languageCode;
    });
    Device.getLanguageTag().then(languageTag => {
      console.log(languageTag);
      this.languageTag = languageTag;
    });
  };

  public logGeolocation() {
    if (isMobile(this.platform)) {
      Geolocation.requestPermissions();
    }
    Geolocation.getCurrentPosition().then(geolocation => {
      console.log(geolocation);
      this.geolocation = geolocation;
    });
  };

  public logNetwork() {
    Network.getStatus().then(connectionStatus => {
      console.log(connectionStatus);
      this.connectionStatus = connectionStatus;
    });
  }

}
