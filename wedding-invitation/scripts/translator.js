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
    "events-title": "결혼합니다",
    "events-content1": "만난지 342일 되는 그날",
    "events-content2": "타국에서 사랑으로 하나된 저희 두사람\n이제 한 가족이 되어 새로운 여정을 함께 하려 합니다.\n\n코로나 및 여러 가지 이유로 소규모 예식을 올리게 되었습니다.\n저희 두 사람 행복한 가정을 이루도록 축복해 주세요.\n\n",
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
    "map-address": "(제주 서귀포시 중문동 중문관광로 198)",
    "map-transportation": "제주공항앞 공항 리무진 버스 600번 - 씨에스호텔 정류장",
    "donation-title": "마음전하는 곳",
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
    "events-title": "WEDDING",
    "events-content1": "MARRIED ON 342 DAY",
    "events-content2": "From a foreign country, the two became together,\nNow, as a family, we are about to start on a new journey together.\n\n",
    "events-event1": "Wedding ceremony",
    "events-event1-location": "JEJU SEAES HOTEL",
    "events-event1-date": "2023. 03. 24. FRI PM 05:00",
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
