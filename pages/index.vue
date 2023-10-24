<script lang="ts" setup>
import { reactive, onMounted } from 'vue';
import { Lunar } from 'lunar-typescript';
import {
  WeiBoFill,
  ZhiHuFill,
  BiliBiliFill,
  BaiDuFill,
} from '~/components/icon';

const data = reactive({
  inter: setTimeout(() => {}, 1000),
  date: {
    year: 1970,
    month: 1,
    date: 1,
    day: '星期四',
    time: '08:00',
    lunarDay: '',
    jieqi: '',
  },
  click: {
    weibo: false,
    zhihu: false,
    bilibili: false,
    baidu: false,
  },
  navShow: false,
});
onBeforeMount(() => init());
onMounted(() => {});
onBeforeUnmount(() => {
  data.inter && clearInterval(data.inter);
});

// initDate
// 初始化时间
const initDate = () => {
  const date = new Date();
  const l = Lunar.fromDate(date);
  data.date = {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    date: date.getDate(),
    day: `星期${l.getWeekInChinese()}`,
    time: date.toTimeString().substring(0, 5),
    lunarDay: `${l.getMonthInChinese()}月${l.getDayInChinese()}`,
    jieqi: l.getJieQi(),
  };
};
const init = () => {
  initDate();
  data.inter = setInterval(() => {
    initDate();
  }, 1000);
};
</script>

<template>
  <div id="home-base">
    <div class="home-base-back">
      <div class="date">
        <div class="time">{{ data.date.time }}</div>
        <div class="day-back">
          <span class="day">{{
            `${data.date.month}月${data.date.date}日`
          }}</span>
          <span class="week">{{ data.date.day }}</span>
          <span class="lunary-day">{{ data.date.lunarDay }}</span>
          <span class="jieqi" v-if="data.date.jieqi">{{
            data.date.jieqi
          }}</span>
        </div>
      </div>

      <div class="content">
        <HomeMessage />
      </div>
    </div>
  </div>
  <Teleport to="body">
    <div class="nav-block">
      <nav :class="['nav-back', { 'nav-show': data.navShow }]">
        <div class="nav-item" style="--i: 5"><WeiBoFill /></div>
        <div class="nav-item" style="--i: 4"><ZhiHuFill /></div>
        <div class="nav-item" style="--i: 3"><BiliBiliFill /></div>
        <div class="nav-item" style="--i: 2"><BaiDuFill /></div>
        <div
          class="nav-item"
          style="--i: 1"
          @click="() => (data.navShow = !data.navShow)"
        >
          M
        </div>
      </nav>
    </div>
  </Teleport>
</template>

<style lang="scss" scoped>
#home-base {
  // height: 100vh;
  // width: 100vw;
  background-image: url('@/assets/img/defaultWallpaper.webp');

  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  // transition: background 0.3s, transform 0.3s, height 0.3s;
  background-size: cover;
  background-position: 50%;
  z-index: 0;

  .home-base-back {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-top: 5vh;
    .date {
      color: white;
      display: grid;
      opacity: 0.8;
      text-shadow: 0 2px 4px rgb(0 0 0 / 16%);

      .time {
        font-size: 4rem;
        text-align: center;
      }

      .day-back {
        line-height: 26px;

        & > * {
          margin: 0 5px;
        }
      }
    }

    .content {
      padding-top: 8vh;
      width: 95%;
      height: 70vh;
      overflow-y: auto;
    }
  }
}
.nav-block {
  position: fixed;
  right: 20px;
  bottom: 20px;

  height: 60px;
  width: 60px;
  z-index: 9;

  .nav-back {
    font-family: 'jokerman';
    position: relative;

    .nav-item {
      width: 60px;
      height: 60px;
      line-height: 60px;
      text-align: center;
      font-size: 1.5rem;
      border-radius: 50px;
      background-color: #bfc1c2;
      // backdrop-filter: saturate(50%) blur(4px);
      position: absolute;
      transition: all 0.3s ease;
    }

    &.nav-show {
      .nav-item {
        // top: calc(-60px * calc(var(--i) - 1));
        transform: translateY(calc(-60px * calc(var(--i) - 1)));

        &:nth-child(5) {
          transform: rotate(360deg);
        }
      }
    }
  }
}
</style>
