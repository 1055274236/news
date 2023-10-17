import { getApi as biliapi } from './bilibili.get';
import { getRealtime as baiduapi } from './baidu.get';
import { getWeb as weiboweb } from './weibo.get';
import { getApi as zhihuapi } from './zhihu.get';
import { NetErrorMessage, SuccessMessage, MESSAGE } from '../basemessage';
import { BAIDUREALTIME, BILIBILIAPI, WEIBOWEB, ZHIHUAPI } from './type';

export default defineEventHandler(async () => {
  let result = await Promise.all([
    biliapi(),
    baiduapi(),
    weiboweb(),
    zhihuapi(),
  ]);
  const data = {
    bili: result[0],
    baidu: result[1],
    weibo: result[2],
    zhihu: result[3],
  };
  return SuccessMessage(data) as MESSAGE<{
    bili: BILIBILIAPI[];
    weibo: WEIBOWEB[];
    baidu: BAIDUREALTIME[];
    zhihu: ZHIHUAPI;
  }>;
});
