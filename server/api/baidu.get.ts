import axios from 'axios';
import { load } from 'cheerio';
import { BAIDUREALTIME } from './type';
import { SuccessMessage } from '../basemessage';
import { find, insert } from '../db';

/*
  realtime 热搜
*/
const FLAG = ['realtime'];

export default defineEventHandler(async (event) => {
  let query = getQuery(event),
    tab = query.tab as string;
  FLAG.indexOf(tab) === -1 && (tab = FLAG[0]);
  return SuccessMessage(await getRealtime());
});

export const getData = async () => {
  let data: BAIDUREALTIME[] = [];
  await find('baidu')
    .then((dbData) => {
      data = dbData.data as BAIDUREALTIME[];
    })
    .catch(async () => {
      data = await getRealtime();
      insert('baidu', data);
    });
  return data;
};

export const getRealtime = async () => {
  let data: BAIDUREALTIME[] = [];
  const result = await axios({
    method: 'get',
    url: `https://top.baidu.com/board?tab=realtime`,
    headers: {
      Accept: '*/*',
      'Accept-Encoding': 'gzip, deflate, br',
      'User-Agent': 'PostmanRuntime-ApipostRuntime/1.1.0',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });

  if (result?.data) {
    const $ = load(result.data);
    $('.category-wrap_iQLoo.horizontal_1eKyQ').each((_, el) => {
      let id = $(el).find('.index_1Ew5p').text(),
        hot = $(el).find('.hot-index_1Bl1a').text();

      if (/^\d+$/.test(id.trim())) {
        data.push({
          id: Number(id),
          title: $(el).find('.c-single-text-ellipsis').text().trim(),
          details: $(el)
            .find('.hot-desc_1m_jR.small_Uvkd3')
            .text()
            .replace(/查看更多>/g, '')
            .trim(),
          hot: (hot && Number(hot)) || 0,
          url: $(el).find('.hot-desc_1m_jR.small_Uvkd3 a').attr('href') || '',
        });
      }
    });
  }

  return data;
};
