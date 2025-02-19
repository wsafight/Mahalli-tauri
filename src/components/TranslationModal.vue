<script setup lang="ts">
import { Button } from "./ui/button";
import { useI18n } from "vue-i18n";
import { store } from "@/store";
import UiModalCard from "./ui/UiModalCard.vue";

const i18n = useI18n();

const changeLocale = (locale: { key: string; text: string }) => {
  i18n.locale.value = locale.key;
  store.setters.updateStore({ key: "currentLocale", value: locale });
  store.setters.updateStore({ key: "show", value: false });
};

const hideModal = () => {
  store.setters.updateStore({ key: "show", value: false });
};
</script>

<template>
  <UiModalCard>
    <template #title>
      {{ i18n.t("g.translationTitle") }}
    </template>
    <template #content>
      <div class="grid grid-cols-2 gap-2">
        <Button
          variant="ghost"
          @click="changeLocale({ key: 'en-US', text: 'English' })"
        >
          <span
            class="w-3/5 items-center h-full text-start flex justify-center gap-2"
          >
            <span class="py-2 w-8">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
                <path
                  fill="#B22334"
                  d="M35.445 7C34.752 5.809 33.477 5 32 5H18v2h17.445zM0 25h36v2H0zm18-8h18v2H18zm0-4h18v2H18zM0 21h36v2H0zm4 10h28c1.477 0 2.752-.809 3.445-2H.555c.693 1.191 1.968 2 3.445 2zM18 9h18v2H18z"
                />
                <path
                  fill="#EEE"
                  d="M.068 27.679c.017.093.036.186.059.277.026.101.058.198.092.296.089.259.197.509.333.743L.555 29h34.89l.002-.004c.135-.233.243-.483.332-.741.034-.099.067-.198.093-.301.023-.09.042-.182.059-.275.041-.22.069-.446.069-.679H0c0 .233.028.458.068.679zM0 23h36v2H0zm0-4v2h36v-2H18zm18-4h18v2H18zm0-4h18v2H18zM0 9c0-.233.03-.457.068-.679C.028 8.542 0 8.767 0 9zm.555-2l-.003.005L.555 7zM.128 8.044c.025-.102.06-.199.092-.297-.034.098-.066.196-.092.297zM18 9h18c0-.233-.028-.459-.069-.68-.017-.092-.035-.184-.059-.274-.027-.103-.059-.203-.094-.302-.089-.258-.197-.507-.332-.74.001-.001 0-.003-.001-.004H18v2z"
                />
                <path fill="#3C3B6E" d="M18 5H4C1.791 5 0 6.791 0 9v10h18V5z" />
                <path
                  fill="#FFF"
                  d="M2.001 7.726l.618.449-.236.725L3 8.452l.618.448-.236-.725L4 7.726h-.764L3 7l-.235.726zm2 2l.618.449-.236.725.617-.448.618.448-.236-.725L6 9.726h-.764L5 9l-.235.726zm4 0l.618.449-.236.725.617-.448.618.448-.236-.725.618-.449h-.764L9 9l-.235.726zm4 0l.618.449-.236.725.617-.448.618.448-.236-.725.618-.449h-.764L13 9l-.235.726zm-8 4l.618.449-.236.725.617-.448.618.448-.236-.725.618-.449h-.764L5 13l-.235.726zm4 0l.618.449-.236.725.617-.448.618.448-.236-.725.618-.449h-.764L9 13l-.235.726zm4 0l.618.449-.236.725.617-.448.618.448-.236-.725.618-.449h-.764L13 13l-.235.726zm-6-6l.618.449-.236.725L7 8.452l.618.448-.236-.725L8 7.726h-.764L7 7l-.235.726zm4 0l.618.449-.236.725.617-.448.618.448-.236-.725.618-.449h-.764L11 7l-.235.726zm4 0l.618.449-.236.725.617-.448.618.448-.236-.725.618-.449h-.764L15 7l-.235.726zm-12 4l.618.449-.236.725.617-.448.618.448-.236-.725.618-.449h-.764L3 11l-.235.726zM6.383 12.9L7 12.452l.618.448-.236-.725.618-.449h-.764L7 11l-.235.726h-.764l.618.449zm3.618-1.174l.618.449-.236.725.617-.448.618.448-.236-.725.618-.449h-.764L11 11l-.235.726zm4 0l.618.449-.236.725.617-.448.618.448-.236-.725.618-.449h-.764L15 11l-.235.726zm-12 4l.618.449-.236.725.617-.448.618.448-.236-.725.618-.449h-.764L3 15l-.235.726zM6.383 16.9L7 16.452l.618.448-.236-.725.618-.449h-.764L7 15l-.235.726h-.764l.618.449zm3.618-1.174l.618.449-.236.725.617-.448.618.448-.236-.725.618-.449h-.764L11 15l-.235.726zm4 0l.618.449-.236.725.617-.448.618.448-.236-.725.618-.449h-.764L15 15l-.235.726z"
                />
              </svg>
            </span>
            English
          </span>
        </Button>
        <Button
          variant="ghost"
          @click="changeLocale({ key: 'fr-FR', text: 'Français ' })"
        >
          <span
            class="w-3/5 items-center h-full text-start flex justify-center gap-2"
          >
            <span class="py-2 w-8">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
                <path
                  fill="#ED2939"
                  d="M36 27c0 2.209-1.791 4-4 4h-8V5h8c2.209 0 4 1.791 4 4v18z"
                />
                <path
                  fill="#002495"
                  d="M4 5C1.791 5 0 6.791 0 9v18c0 2.209 1.791 4 4 4h8V5H4z"
                />
                <path fill="#EEE" d="M12 5h12v26H12z" />
              </svg>
            </span>
            Francais
          </span>
        </Button>
        <Button
          variant="ghost"
          @click="changeLocale({ key: 'ar-AE', text: 'العربية' })"
        >
          <span
            class="w-3/5 items-center h-full text-start flex justify-center gap-2"
          >
            <span class="py-2 w-8">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
                <path
                  fill="#C1272D"
                  d="M32 5H4C1.791 5 0 6.791 0 9v18c0 2.209 1.791 4 4 4h28c2.209 0 4-1.791 4-4V9c0-2.209-1.791-4-4-4z"
                />
                <path
                  fill="#006233"
                  d="M15.047 22.165l1.128-3.471-2.953-2.145h3.649L18 13.074l1.129 3.474h3.649l-2.953 2.145 1.128 3.471L18 20.019l-2.953 2.146zm3.583-2.603l.916.665-.35-1.077-.566.412zm-1.826-.412l-.35 1.077.916-.665-.566-.412zm.241-.74l.955.694.955-.694-.365-1.122h-1.182l-.363 1.122zM15.5 17.288l.915.665.216-.665H15.5zm3.869 0l.216.665.915-.665h-1.131zm-1.019-.74L18 15.47l-.35 1.079h.7z"
                />
              </svg>
            </span>
            العربية
          </span>
        </Button>
        <Button
          variant="ghost"
          @click="changeLocale({ key: 'de-DE', text: 'Deutsch' })"
        >
          <span
            class="w-3/5 items-center h-full text-start flex justify-center gap-2"
          >
            <span class="py-2 w-8">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
                <path
                  fill="#FFCD05"
                  d="M0 27c0 2.209 1.791 4 4 4h28c2.209 0 4-1.791 4-4v-4H0v4z"
                />
                <path fill="#ED1F24" d="M0 14h36v9H0z" />
                <path
                  fill="#141414"
                  d="M32 5H4C1.791 5 0 6.791 0 9v5h36V9c0-2.209-1.791-4-4-4z"
                />
              </svg>
            </span>
            German
          </span>
        </Button>
        <Button variant="ghost" @click="changeLocale({ key: 'zh-CN', text: '简体中文' })">
          <span class="w-3/5 items-center h-full text-start flex justify-center gap-2">
            <span class="py-2 w-8">
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 30 20">
                <defs>
                  <path id="s" d="M0,-1 0.587785,0.809017 -0.951057,-0.309017H0.951057L-0.587785,0.809017z"
                    fill="#ffde00" />
                </defs>
                <rect width="30" height="20" fill="#de2910" />
                <use xlink:href="#s" transform="translate(5,5) scale(3)" />
                <use xlink:href="#s" transform="translate(10,2) rotate(23.036243)" />
                <use xlink:href="#s" transform="translate(12,4) rotate(45.869898)" />
                <use xlink:href="#s" transform="translate(12,7) rotate(69.945396)" />
                <use xlink:href="#s" transform="translate(10,9) rotate(20.659808)" />
              </svg>
            </span>
            简体中文
          </span>
        </Button>
      </div>
    </template>
    <template #footer>
      <div class="w-full grid grid-cols-1 gap-2">
        <Button @click="hideModal" type="button" variant="outline">
          {{ i18n.t("g.b.no") }}
        </Button>
      </div>
    </template>
  </UiModalCard>
</template>
