import {Component} from '@angular/core';
import {Device, DeviceInfo} from '@capacitor/device';
import {BatteryInfo} from "@capacitor/device/dist/esm/definitions";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public deviceInfo: DeviceInfo | undefined;
  public batteryInfo: BatteryInfo = {};

  constructor() {
    this.logDeviceInfo();
    this.logBatteryInfo();
  }

  public logDeviceInfo() {
    Device.getInfo().then(deviceInfo => {
      console.log(deviceInfo);
      this.deviceInfo = deviceInfo;
    });
  };

  public logBatteryInfo() {
    Device.getBatteryInfo().then(batteryInfo => {
      console.log(batteryInfo);
      this.batteryInfo = batteryInfo
    });
  };

}
