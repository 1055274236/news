import axios from 'axios';
import { load } from 'cheerio';
import { SuccessMessage, NetErrorMessage } from '../basemessage';

/*
  realtimehot 热搜
  entrank 文娱
  sport 体育
  game 游戏
  socialevent 要闻
*/
const FLAG = ['realtimehot', 'entrank', 'sport', 'game', 'socialevent'];

export default defineEventHandler(async (event) => {
  let query = getQuery(event),
    cate = query.cate as string;
  FLAG.indexOf(cate) === -1 && (cate = 'realtimehot');

  let isErr: any;
  let data: {
    id: number;
    title: string;
    url: string;
    hot: number;
  }[] = [];
  const result = await axios({
    method: 'get',
    url: `https://s.weibo.com/top/summary?cate=${cate}`,
    headers: {
      Cookie:
        'SUB=_2AkMTkpt3f8NxqwJRmf8QxGPhbYV1zArEieKlzmqsJRMxHRl-yT9vqnUdtRB6OBK1mGmyZkx6chI_P-5uv2G_2ZuzH7nn; SUBP=0033WrSXqPxfM72-Ws9jqgMF55529P9D9WhmBJ_9hk4n7aCe7WvwI7vd; SINAGLOBAL=104275179579.35838.1691227200526; _s_tentry=cn.bing.com; UOR=,,cn.bing.com; Apache=4950058247422.4375.1696297331301; ULV=1696297331307:5:1:1:4950058247422.4375.1696297331301:1695897733971',
      Accept: '*/*',
      'Accept-Encoding': 'gzip, deflate, br',
      'User-Agent': 'PostmanRuntime-ApipostRuntime/1.1.0',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  }).catch((e) => {
    isErr = e;
  });

  if (result?.data) {
    const $ = load(result.data);
    const ranktopHtml = $('tbody').find('tr').toArray();
    for (let i = 0; i < ranktopHtml.length; i++) {
      let id = ranktopHtml[i].children[1].children[0].data;
      let hot = /\d+/.exec(
        ranktopHtml[i].children[3].children[3]?.children[0].data
      );

      if (cate !== 'socialevent' && !/^\d+$/.test(id)) continue;

      data.push({
        id,
        title: ranktopHtml[i].children[3].children[1].children[0].data,
        hot: (hot && Number(hot[0])) || 0,
        url:
          'https://s.weibo.com' +
          ranktopHtml[i].children[3].children[1].attribs['href'],
      });
    }
  }

  return isErr ? NetErrorMessage('网络错误！', isErr) : SuccessMessage(data);
});
