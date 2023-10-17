<script lang="ts" setup>
import { reactive, onMounted } from 'vue';
import { BaiDu, BiliBili, WeiBo, ZhiHu } from './icon';

const props = defineProps({
  icon: {
    type: String,
    required: true,
    validator(value: string) {
      return ['weibo', 'zhihu', 'bilibili', 'baidu'].includes(value);
    },
  },
  list: Array<{
    title: string;
    url: string;
    hot: number | string;
  }>,
});

const data = reactive({});
onMounted(() => {});

const numberSuffix = (n: number) => {
  return n > 10000 ? `${(n / 1000).toFixed(1)}万` : n;
};
</script>

<template>
  <div class="infocard">
    <div class="card-title-icon">
      <WeiBo v-if="props.icon === 'weibo'" />
      <ZhiHu v-if="props.icon === 'zhihu'" />
      <BiliBili v-if="props.icon === 'bilibili'" />
      <BaiDu v-if="props.icon === 'baidu'" />
    </div>
    <div class="card-back">
      <a
        class="card-item"
        v-for="(item, index) in props.list"
        :key="index"
        :href="item.url"
        target="_blank"
      >
        <span class="id">{{ `${index + 1}.` }}</span>
        <span class="title">{{ item.title }}</span>
        <span class="hot" v-if="item.hot">{{
          typeof item.hot === 'number' ? numberSuffix(item.hot) : item.hot
        }}</span>
      </a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.infocard {
  background-color: #fff;
  width: calc(100% - 12px);
  max-width: 60vw;
  position: relative;
  height: 30vh;
  border-radius: 13px;
  background-color: #f4f4f480;
  padding: 6px;
  // backdrop-filter: saturate(50%) blur(4px);
  .card-title-icon {
    position: absolute;
    font-size: 2rem;
    height: 2rem;
    width: 2rem;
    top: calc(-1rem - 10px);
    left: 50%;
    transform: translateX(-50%);
    background-color: #d5d0d0;
    padding: 10px;
    border-radius: 5rem;
  }

  .card-back {
    overflow: auto;
    height: calc(100% - 40px);
    margin-top: 30px;

    a {
      text-decoration: none;
      color: inherit;
    }

    .card-item {
      display: flex;
      // grid-template-columns: 20px 1fr 50px;
      margin: 1px 0;

      .id {
        width: 20px;
      }
      .title {
        flex: 1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .hot {
        width: 50px;
      }
    }
  }
}
</style>
