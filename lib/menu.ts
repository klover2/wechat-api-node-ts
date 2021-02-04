'use strict';
import request from 'superagent';
class Menu {
  /**
   * 创建自定义菜单
   * 详细请看：https://developers.weixin.qq.com/doc/offiaccount/Custom_Menus/Creating_Custom-Defined_Menu.html
   * */
  async createMenu(button: Array<object>, access_token: string): Promise<object> {
    const url = `https://api.weixin.qq.com/cgi-bin/menu/create?access_token=${access_token}`;
    const result = await request.post(url).send({button}).set('Accept-Encoding', 'gzip,sdch');
    return result.body;
  }
  /**
   * 获取菜单
   * 详细请看：https://developers.weixin.qq.com/doc/offiaccount/Custom_Menus/Querying_Custom_Menus.html
   * */
  async getMenu(access_token: string): Promise<object> {
    const url = `https://api.weixin.qq.com/cgi-bin/get_current_selfmenu_info?access_token=${access_token}`;
    const result = await request.get(url).set('accept', 'json');
    return result.body;
  }
  /**
   * 删除自定义菜单
   * 详细请看：https://developers.weixin.qq.com/doc/offiaccount/Custom_Menus/Deleting_Custom-Defined_Menu.html
   * */
  async removeMenu(access_token: string): Promise<object> {
    const url = `https://api.weixin.qq.com/cgi-bin/menu/delete?access_token=${access_token}`;
    const result = await request.get(url).set('accept', 'json');
    return result.body;
  }
  /**
   * 获取自定义菜单配置
   * 详细请看：https://developers.weixin.qq.com/doc/offiaccount/Custom_Menus/Getting_Custom_Menu_Configurations.html
   * */
  async getMenuConfig(access_token: string): Promise<object> {
    const url = `https://api.weixin.qq.com/cgi-bin/menu/get?access_token=${access_token}`;
    const result = await request.get(url).set('accept', 'json');
    return result.body;
  }
}
export = Menu;
