// The active locale
const defaultLocale = "ko";

let locale;

// We can have as many locales here as we want,
// and use any locales we want. We have English
// and Arabic as locales here as examples.

const translations = {
  // English translations
  "ko": {
    "home-title": "Jehyeok & Chi",
    "home-subtitle": "| WE ARE GETTING MARRIED |",
    "home-date": "2023. 03. 24. FRI PM 05:00",
    "home-location": "제주 서귀포시 씨에스호텔",
    "couple-title": "신부 & 신랑",
    "couple-bride": "장츠",
    "couple-groom": "이제혁",
    "events-title": "초대합니다",
    "events-content1": "만난지 342일 되는 그날",
    "events-content2": "타국에서 만나 인연이된 둘,\n이제 한 가족이 되어 새로운 여정을 함께 하려 합니다.\n\n참석하시어 자리를 빛내주시면 감사하겠습니다.\n\n",
    "events-event1": "웨딩 본식",
    "events-event1-location": "제주 씨에스 호텔",
    "events-event1-date": "2023년 3월 24일, 5:00PM",
    "events-event2": "저녁 식사",
    "events-event2-location": "씨에스 호텔 야외 혹은 실내",
    "events-event2-date": "2023년 3월 24일, 6:30PM - 8:30PM",
    "gallery-title": "포토 갤러리",
    "gallery-content1": "우리 둘",
    "gallery-content2": "사랑하며 살겠습니다",
    "map-title": "오시는 길",
    "map-location": "씨에스 호텔",
    "map-address": "(대한민국 제주특별자치도 서귀포시 중문동 중문관광로 198)",
    "map-transportation": "제주공항앞 공항 리무진 버스 600번 - 씨에스호텔 정류장\n(1시간 20분, 배차 간격 15-40분)",
    "donation-title": "축의금",
    "donation-content": "행복하게 잘 살겠습니다",
    "comment-title": "축하메시지",
  },

  "en": {
    "home-title": "Jehyeok & Chi",
    "home-subtitle": "| WE ARE GETTING MARRIED |",
    "home-date": "2023. 03. 24. FRI PM 05:00",
    "home-location": "JEJU SEOGWIPO SEAES HOTEL",
    "couple-title": "BRIDE & GROOM",
    "couple-bride": "CHI ZHANG",
    "couple-groom": "JEHYEOK LEE",
    "events-title": "INVITE YOU",
    "events-content1": "MARRIED ON 342 DAY",
    "events-content2": "The two met in a foreign country and became together,\nNow, as a family, we are about to embark on a new journey together.\n\nThank you for attending and brightening the occasion.\n\n",
    "events-event1": "Wedding ceremony",
    "events-event1-location": "JEJU SEAES HOTEL",
    "events-event1-date": "2023. 03. 24. FRI PM 05:00",
    "events-event2": "Dinner",
    "events-event2-location": "씨에스 호텔 야외 혹은 실내",
    "events-event2-date": "2023. 03. 24. 6:30PM - 8:30PM",
    "gallery-title": "GALLERY",
    "gallery-content1": "TWO OF US",
    "gallery-content2": "Will live in love",
    "map-title": "MAP",
    "map-location": "SEAES HOTEL",
    "map-address": "(198 Jungmun Gwangwang-ro, Jungmun-dong, Seogwipo-si, Jeju-do, Republic of Korea)",
    "map-transportation": "Airport Limousine Bus No. 600 in front of Jeju Airport - Seaes Hotel stop\n(1 hour 20 minutes, 15-40 minutes between dispatches)",
    "donation-title": "MONEY GIFT",
    "donation-content": "Will live happily ever after",
    "comment-title": "GUEST MESSAGE",
  },
};

// When the page content is ready...

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URL(location.href).searchParams;
  const lang = urlParams.get('lang');
  console.log(lang);
  if (lang != null && translations[lang]) {
    setLocale(lang);
    bindLocaleSwitcher(lang);
  }
  else {
    setLocale(defaultLocale);
    bindLocaleSwitcher(defaultLocale);
  }
});

// Replace the inner text of the given HTML element
// with the translation in the active locale,
// corresponding to the element's data-i18n-key
function translateElement(element) {
  const key = element.getAttribute("data-i18n-key");
  const translation = translations[locale][key];
  element.innerText = translation;
}

// Whenever the user selects a new locale, we
// load the locale's translations and update
// the page
function bindLocaleSwitcher(initialValue) {
  const switcher =
    document.querySelector("[data-i18n-switcher]");
  switcher.value = initialValue;
  switcher.onchange = (e) => {
    // Set the locale to the selected option[value]
    setLocale(e.target.value);
  };
}

function setLocale(newLocale) {
  if (newLocale === locale) return;
  locale = newLocale;
  translatePage();
}

function translatePage() {
  document
    .querySelectorAll("[data-i18n-key]")
    .forEach(translateElement);
}