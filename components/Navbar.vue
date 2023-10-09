<script lang="ts" setup>
import { reactive, onMounted, onBeforeUnmount } from 'vue';

const data = reactive({
  topShow: false,
});
onMounted(() => {
  addlis();
});
onBeforeUnmount(() => {
  window.onscroll = null;
});

const addlis = (): void => {
  window.onscroll = () => {
    if (window.scrollY > 30) {
      data.topShow = true;
    } else {
      data.topShow = false;
    }
  };
};

const toTop = (): void => {
  document.body.scrollIntoView({
    behavior: 'smooth', // 平滑过渡
  });
};
</script>

<template>
  <div id="navtop" :class="{ showTop: data.topShow }">
    <div class="navtop-back">
      <nav class="navtop-body">
        <div class="title">Ming</div>
        <div class="toTop-body">
          <span @click="toTop">
            <svg
              t="1695265627691"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="1528"
              width="1em"
              hidden="1em"
            >
              <path
                d="M909.741 548.482l-2.167-1.218-311.78-175.263V204.673c0-30.724-49.083-141.239-88.45-139.656-38.109 1.532-79.138 108.932-79.138 139.656V372L116.425 547.264l-2.167 1.218a27.932 27.932 0 0 0-14.245 24.348v36.273c0 18.534 17.722 31.929 35.553 26.871l292.64-102.303V819.16c0 6.307 0.716 12.372 2.016 18.039l-135.957 76.427-9.034 5.078v12.347c0 18.534 17.722 31.929 35.553 26.871l187.727-53.245a27.937 27.937 0 0 1 15.513 0.078l178.922 52.699c17.892 5.27 35.823-8.142 35.823-26.793v-11.957l-9.034-5.078-135.957-76.427c1.3-5.667 2.016-11.732 2.016-18.039V529.266l292.37 106.242c17.892 5.27 35.823-8.142 35.823-26.793v-35.884a27.931 27.931 0 0 0-14.246-24.349z"
                p-id="1529"
                fill="currentColor"
              ></path>
            </svg>
          </span>
        </div>
      </nav>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#navtop {
  user-select: none;
  position: fixed;
  // top: 0;
  // left: 0;
  width: 100vw;
  transition: all 0.5s ease;
  font-size: 20px;
  backdrop-filter: saturate(50%) blur(4px);

  .navtop-back {
    display: block;
    border-radius: 500px;
    box-shadow: var(--boxshadow-dark);
    width: calc(100% - 40px);
    margin: 20px;
    background-color: transparent;
    opacity: 1;
    line-height: 60px;
    height: 60px;
    overflow: hidden;

    .navtop-body {
      .title {
        margin-left: 21px;
        letter-spacing: 10px;
        font-family: 'jokerman', '宋体';
        transition: all 0.5s ease;
      }

      .toTop-body {
        height: 60px;
        width: 60px;
        position: relative;

        span {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 30px;
          cursor: pointer;
        }
      }
    }
  }

  &.showTop {
    width: 100px;
    transform: translate(calc(100vw - 120px), calc(100vh - 130px));

    .navtop-body {
      animation: moveTop 1s forwards;

      .title {
        letter-spacing: 30px;
      }
    }
  }
}

@keyframes moveTop {
  50% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-60px);
  }
}
</style>
