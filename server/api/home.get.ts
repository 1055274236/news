import { getData as biliData } from './bilibili.get';
import { getData as baiduData } from './baidu.get';
import { getData as weiboData } from './weibo.get';
import { getData as zhihuData } from './zhihu.get';
import { SuccessMessage, MESSAGE } from '../basemessage';
import { HOMEBASEMESSAGE } from './type';
import config from '~/config';
import { startCraw } from './restartcraw.get';

export default defineEventHandler(async () => {
  config.server.crawling && startCraw();
  let result = await Promise.allSettled([
    biliData(),
    baiduData(),
    weiboData(),
    zhihuData(),
  ]);
  const data = {
    bili:
      result[0].status === 'fulfilled'
        ? result[0].value.map((item) => ({
            title: item.show_name,
            url:
              item.uri ||
              `https://search.bilibili.com/all?keyword=${item.keyword}`,
            hot: 0,
          }))
        : [],
    baidu:
      result[1].status === 'fulfilled'
        ? result[1].value.map((item) => ({
            title: item.title,
            url: item.url,
            hot: item.hot,
          }))
        : [],
    weibo:
      result[2].status === 'fulfilled'
        ? result[2].value.map((item) => ({
            title: item.title,
            url: item.url,
            hot: item.hot,
          }))
        : [],
    zhihu:
      result[3].status === 'fulfilled'
        ? result[3].value.data.map((item) => ({
            title: item.question.title,
            url: item.question.url,
            hot: 0,
          }))
        : [],
  };
  return SuccessMessage(data) as MESSAGE<{
    bili: HOMEBASEMESSAGE[];
    weibo: HOMEBASEMESSAGE[];
    zhihu: HOMEBASEMESSAGE[];
    baidu: HOMEBASEMESSAGE[];
  }>;
});
