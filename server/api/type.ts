// 知乎
export interface Topic {
  url_token: number;
  name: string;
}

export interface Creator {
  url_token: string;
  name: string;
}

export interface Question {
  url: string;
  created: number;
  updated_time: number;
  title: string;
  highlight_title: string;
  type: string;
  id: string;
  token: number;
  is_recent_hot: boolean;
  have_answer: boolean;
  question_answer_url: string;
  topics: Topic[];
  label: string;
  creator: Creator;
}

export interface Reaction {
  new_pv: number;
  new_pv_7_days: number;
  new_follow_num: number;
  new_follow_num_7_days: number;
  new_answer_num: number;
  new_answer_num_7_days: number;
  new_upvote_num: number;
  new_upvote_num_7_days: number;
  pv: number;
  follow_num: number;
  answer_num: number;
  upvote_num: number;
  pv_incr_rate: string;
  head_percent: string;
  new_pv_yesterday: number;
  new_pv_t_yesterday: number;
  score: number;
  score_level: number;
  text: string;
}

export interface Data {
  question: Question;
  reaction: Reaction;
}

export interface Paging {
  is_end: boolean;
  is_start: boolean;
  next: string;
  previous: string;
  totals: number;
}

export interface ZHIHUAPI {
  data: Data[];
  paging?: Paging;
}

// bilibili
export interface BILIBILIAPI {
  keyword: string;
  show_name: string;
  icon?: string;
  uri: string;
  goto?: string;
}

// weibo
export interface WEIBOWEB {
  id: number;
  title: string;
  url: string;
  hot: number;
}

// baidu
export interface BAIDUREALTIME {
  id: number;
  title: string;
  details: string;
  url: string;
  hot: number;
}

export interface HOMEBASEMESSAGE {
  title: string;
  hot: number;
  url: string;
}
