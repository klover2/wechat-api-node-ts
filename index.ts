'use strict';
import request from 'superagent';

import Menu from './lib/menu';

interface IWechatApi {
  appid: string;
  secret: string;
}
class WechatApi implements Menu {
  private appid: string;
  private secret: string;

  constructor(appid: string, secret: string);
  constructor(options: IWechatApi);
  constructor(arg: string | IWechatApi, secret?: string) {
    if (arg instanceof Object) {
      this.appid = arg.appid;
      this.secret = arg.secret;
    } else {
      this.appid = arg;
      this.secret = secret || '';
    }
  }
  static applyMixins(derivedCtor: any, baseCtors: any[]) {
    baseCtors.forEach(baseCtor => {
      Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
        derivedCtor.prototype[name] = baseCtor.prototype[name];
      });
    });
  }
  /**
   * 获取access_token
   * 详细请看：https://developers.weixin.qq.com/doc/offiaccount/Basic_Information/Get_access_token.html
   * */
  public async getAccessToken(): Promise<object> {
    const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${this.appid}&secret=${this.secret}`;
    const result = await request.get(url).set('accept', 'json');
    return result.body;
  }
  // 菜单 api
  createMenu!: (button: Array<object>, access_token: string) => Promise<object>;
  getMenu!: (access_token: string) => Promise<object>;
  removeMenu!: (access_token: string) => Promise<object>;
  getMenuConfig!: (access_token: string) => Promise<object>;
}
WechatApi.applyMixins(WechatApi, [Menu]);
export = WechatApi;
