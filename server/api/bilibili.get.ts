import axios from 'axios';
import { SuccessMessage, NetErrorMessage } from '../basemessage';
import { BILIBILIAPI } from './type';
import { find, insert } from '../db';

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  let limit = (query.limit as number) || 20;
  return SuccessMessage(await getData(limit));
});

export const getData = async (limit: number = 20) => {
  let data: BILIBILIAPI[] = [];
  const query = { limit };
  await find('bili', query)
    .then((dbData) => {
      data = dbData.data as BILIBILIAPI[];
    })
    .catch(async () => {
      data = await getApi();
      insert('bili', data, query);
    });
  return data;
};

export const getApi = async (limit: number = 20): Promise<BILIBILIAPI[]> => {
  const data: BILIBILIAPI[] = [];
  const result = await axios({
    method: 'get',
    url: `https://api.bilibili.com/x/web-interface/wbi/search/square?limit=${limit}`,
  });
  if (result.data) {
    (result.data.data.trending.list as BILIBILIAPI[]).forEach((item) => {
      data.push({
        keyword: item.keyword,
        show_name: item.show_name,
        uri:
          item.uri || `https://search.bilibili.com/all?keyword=${item.keyword}`,
      });
    });
  }
  return data;
};
