import { getApi as biliapi } from './bilibili.get';
import { getRealtime as baiduapi } from './baidu.get';
import { getWeb as weiboweb } from './weibo.get';
import { getApi as zhihuapi } from './zhihu.get';
import { SuccessMessage } from '../basemessage';

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
  return SuccessMessage(data);
});
