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
    "home-subtitle": "| 결혼합니다 |",
    "home-date": "2023. 03. 24. FRI PM 05:00",
    "home-location": "제주 서귀포시 씨에스호텔",
    "couple-title": "신랑 & 신부",
    "couple-bride-family": "장웨칭 리우빙 딸",
    "couple-bride": "장츠",
    "couple-groom-family": "이근호 지은정 아들",
    "couple-groom": "이제혁",
    "events-title": "결혼합니다",
    "events-content1": "만난지 342일 되는 그날",
    "events-content2": "타국에서 만나 사랑으로\n하나된 저희 두 사람\n\n가족들의 축복속에\n소규모 예식을 올리게 되었습니다.\n\n많은 분을 초대하지 못하는점\n넓은 마음으로 양해를 구합니다.\n\n저희 둘,\n서로 아껴주고 배려하며\n사랑하며 살겠습니다.\n\n축복하고 격려해 주세요\n\n",
    "events-event1": "웨딩 본식",
    "events-event1-location": "제주 씨에스 호텔",
    "events-event2": "저녁 식사",
    "events-event2-location": "씨에스 호텔 야외 혹은 실내",
    "events-event2-date": "2023년 3월 24일, 6:30PM - 8:30PM",
    "gallery-title": "포토 갤러리",
    "gallery-content1": "우리 둘",
    "gallery-content2": "사랑하며 살겠습니다",
    "map-title": "오시는 길",
    "map-location": "씨에스 호텔",
    "map-address": "(제주 서귀포시 중문동 중문관광로 198)",
    "map-transportation": "제주공항앞 공항 리무진 버스 600번 - 씨에스호텔 정류장",
    "donation-title": "마음전하는 곳",
    "donation-content": "행복하게 잘 살겠습니다",
    "comment-title": "응원메시지",
  },

  "en": {
    "home-title": "Jehyeok & Chi",
    "home-subtitle": "WE ARE GETTING MARRIED",
    "home-date": "2023. 03. 24. FRI PM 05:00",
    "home-location": "JEJU SEOGWIPO SEAES HOTEL",
    "couple-title": "GROOM & BRIDE",
    "couple-bride-family": "HuiQing Zhang & Bing Liu",
    "couple-bride": "CHI ZHANG",
    "couple-groom-family": "GnHo Lee & EunJung Ji",
    "couple-groom": "JEHYEOK LEE",
    "events-title": "MARRIED",
    "events-content1": "ON 342nd DAY",
    "events-content2": "From a distant country,\nthe two of us\nbecame together by love\n\nNow, as a family\nwe are about to start on\na new journey together.\n\nThe two of us\nshall give each other light\n\nThe two of us\nshall give each other rest\n\nPlease bless\n and encourage of us",
    "events-event1": "Wedding ceremony",
    "events-event1-location": "JEJU SEAES HOTEL",
    "events-event1-date": "2023. 03. 24. FRI PM 04:30",
    "events-event2": "Dinner",
    "events-event2-location": "JEJU SEAES HOTEL (outdoor or indoor)",
    "events-event2-date": "2023. 03. 24. 6:30PM - 8:30PM",
    "gallery-title": "GALLERY",
    "gallery-content1": "TWO OF US",
    "gallery-content2": "Will live in love",
    "map-title": "MAP",
    "map-location": "SEAES HOTEL",
    "map-address": "(198 Jungmun Gwangwang-ro, Jungmun-dong, Seogwipo-si, Jeju-do)",
    "map-transportation": "Jeju Airport Bus no.600 - Seaes Hotel",
    "donation-title": "MONEY GIFT",
    "donation-content": "Will live happily ever after",
    "comment-title": "GUEST MESSAGE",
  },

  "zh": {
    "home-title": "Jehyeok & Chi",
    "home-subtitle": "恭请您和您的家人出席\n李济奕和张驰的婚礼",
    "home-date": "2023年3月24号下午五点",
    "home-location": "韩国济州岛西亚斯度假酒店\n(The Seaes Hotel & Resort)",
    "couple-title": "GROOM & BRIDE",
    "couple-bride-family": "HuiQing Zhang & Bing Liu",
    "couple-bride": "CHI ZHANG",
    "couple-groom-family": "GnHo Lee & EunJung Ji",
    "couple-groom": "JEHYEOK LEE",
    "events-title": "MARRIED",
    "events-content1": "ON 342nd DAY",
    "events-content2": "From a distant country,\nthe two of us\nbecame together by love\n\nNow, as a family\nwe are about to start on\na new journey together.\n\nThe two of us\nshall give each other light\n\nThe two of us\nshall give each other rest\n\nPlease bless\n and encourage us",
    "events-event1": "Wedding ceremony",
    "events-event1-location": "JEJU SEAES HOTEL",
    "events-event2": "Dinner",
    "events-event2-location": "JEJU SEAES HOTEL (outdoor or indoor)",
    "events-event2-date": "2023. 03. 24. 6:30PM - 8:30PM",
    "gallery-title": "GALLERY",
    "gallery-content1": "TWO OF US",
    "gallery-content2": "Will live in love",
    "map-title": "MAP",
    "map-location": "SEAES HOTEL",
    "map-address": "(198 Jungmun Gwangwang-ro, Jungmun-dong, Seogwipo-si, Jeju-do)",
    "map-transportation": "Jeju Airport Bus no.600 - Seaes Hotel",
    "donation-title": "MONEY GIFT",
    "donation-content": "Will live happily ever after",
    "comment-title": "GUEST MESSAGE",
  },
};

// When the page content is ready...

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URL(location.href).searchParams;
  const lang = urlParams.get('lang');
  setLocale(lang);
});

// Replace the inner text of the given HTML element
// with the translation in the active locale,
// corresponding to the element's data-i18n-key
function translateElement(element) {
  const key = element.getAttribute("data-i18n-key");
  const translation = translations[locale][key];
  if (translation == null)
    translation = translations[defaultLocale][key];
  element.innerText = translation;
}

// Whenever the user selects a new locale, we
// load the locale's translations and update
// the page
function bindLocaleSwitcher() {
  const switcher = document.querySelector("[data-i18n-switcher]");
  switcher.value = locale;
  switcher.onchange = (e) => {
    // Set the locale to the selected option[value]
    setLocale(e.target.value);
  };
}

function setLocale(newLocale) {
  if (!translations[newLocale])
    newLocale = defaultLocale;

  if (newLocale === locale)
    return;

  locale = newLocale;
  translatePage();
  bindLocaleSwitcher();
  hideElements("[koonly]", locale != "ko")
}

function translatePage() {
  document
    .querySelectorAll("[data-i18n-key]")
    .forEach(translateElement);
}

function hideElements(elementKey, hide) {
    document.querySelectorAll(elementKey).forEach(function (item) {
        if (hide)
            item.style.display = 'none';
    });
}