import axios from 'axios';
import { SuccessMessage, NetErrorMessage } from '../basemessage';
import { BILIBILIAPI } from './type';

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  let limit = (query.limit as number) || 20;
  try {
    return SuccessMessage(await getApi(limit));
  } catch (e) {
    return NetErrorMessage(e);
  }
});

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
