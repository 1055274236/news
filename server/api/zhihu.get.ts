import axios from 'axios';
import { SuccessMessage, NetErrorMessage } from '../basemessage';
import { ZHIHUAPI } from './type';

/*
  '全部', '数码', '科技', '互联网', '商业财经', '职场', '教育', '法律', '军事', '汽车',
  '人文社科', '自然科学', '工程技术', '情感', '心理学', '两性', '母婴亲子', '家居', '健康', '艺术', 
  '音乐', '设计', '影视娱乐', '宠物', '体育电竞', '运动健身', '动漫游戏', '美食', '旅行', '时尚'
*/
const domainArr = [
  '0',
  '100000',
  '100001',
  '100002',
  '100003',
  '100004',
  '100005',
  '100006',
  '100007',
  '100008',
  '100009',
  '100010',
  '100011',
  '100012',
  '100013',
  '100014',
  '100015',
  '100016',
  '100017',
  '100018',
  '100019',
  '100020',
  '100021',
  '100022',
  '100023',
  '100024',
  '100025',
  '100026',
  '100027',
  '100028',
  '100029',
];
const periodArr = ['hour', 'week', 'day'];

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  let domain = (query.domain as string) || '',
    period = (query.period as string) || '',
    offect = Number(query.offect as string) || 0,
    limit = Number(query.limit as string) || 20;

  domainArr.indexOf(domain) === -1 && (domain = '0');
  periodArr.indexOf(period) === -1 && (period = 'hour');

  try {
    return SuccessMessage(await getApi(domain, period, offect, limit));
  } catch (e) {
    return NetErrorMessage(e);
  }
});

export const getApi = async (
  domain: string = '0',
  period: string = 'hour',
  offect: number = 0,
  limit: number = 20
) => {
  const result = await axios({
    method: 'get',
    url: `https://www.zhihu.com/api/v4/creators/rank/hot?domain=${domain}&limit=${limit}&offset=${offect}&period=${period}`,
  });

  if (result?.data) {
    return result.data as ZHIHUAPI;
  }
};
