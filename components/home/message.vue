<script lang="ts" setup>
import { reactive, onMounted } from 'vue';
interface CardType {
  title: string;
  url: string;
  hot: number | string;
}

const data = reactive({
  message: {
    weibo: [] as CardType[],
    bilibili: [] as CardType[],
    zhihu: [] as CardType[],
    baidu: [] as CardType[],
  },
});
onMounted(() => {});

// 爬取热点
const getRealtime = async () => {
  const result = (await useFetch('/api/home')).data.value;

  if (result) {
    data.message.baidu = result.data.baidu.map((item) => ({
      title: item.title,
      url: item.url,
      hot: item.hot,
    }));
    data.message.bilibili = result.data.bili.map((item) => ({
      title: item.show_name,
      url:
        item.uri || `https://search.bilibili.com/all?keyword=${item.keyword}`,
      hot: 0,
    }));
    data.message.weibo = result.data.weibo.map((item) => ({
      title: item.title,
      url: item.url,
      hot: item.hot,
    }));
    data.message.zhihu = result.data.zhihu.data.map((item) => ({
      title: item.question.title,
      url: item.question.url,
      hot: 0,
    }));
  }
};
getRealtime();
</script>

<template>
  <div class="home-message">
    <div class="message-back">
      <Card :icon="'weibo'" :list="data.message.weibo"></Card>
      <Card :icon="'baidu'" :list="data.message.baidu"></Card>
      <Card :icon="'zhihu'" :list="data.message.zhihu"></Card>
      <Card :icon="'bilibili'" :list="data.message.bilibili"></Card>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home-message {
  font-size: 12px;
  width: 100%;
  height: 100%;
}

@media screen and (max-width: 750px) {
  .message-back {
    display: grid;
    grid-gap: 2rem 10px;
    grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
  }
}
@media screen and (min-width: 751px) {
  .message-back {
    display: flex;
    width: 95vw;
    height: 100%;
    font-size: 14px;

    & > * {
      flex: 1;
      width: 22%;
      margin: 0 2px;
      height: 90%;
    }
  }
}
</style>
