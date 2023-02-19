import {Platform} from '@ionic/angular';
import {PlatformEnum} from './platform.enum';

export const MOBILE_DEFAULT_WIDTH: number = 455;

export function isMobile(platform: Platform): boolean {
  return isIos(platform) || isAndroid(platform);
}

export function isAndroid(platform: Platform): boolean {
  return !platform.is('mobileweb') && platform.is(PlatformEnum.ANDROID);
}

export function isIos(platform: Platform): boolean {
  return !platform.is('mobileweb') && platform.is(PlatformEnum.IOS);
}
