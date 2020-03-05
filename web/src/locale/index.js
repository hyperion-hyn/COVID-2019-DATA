import en_US from "./en_US";
import zh_CN from "./zh_CN";

//add more language here.
export const supportedLocales = [
  { lang: "en", desc: "English", messages: en_US },
  { lang: "zh", desc: "简体中文", messages: zh_CN }
];

export function findLocale(lang) {
  let locale = supportedLocales[0];
  for (let i = 0; i < supportedLocales.length; i++) {
    if (supportedLocales[i].lang === lang) {
      locale = supportedLocales[i];
      break;
    }
  }
  return locale;
}

let lang = sessionStorage.getItem("lang");
if (!lang) {
  lang = navigator.language.split("-")[0];
}

export const defaultLocale = findLocale(lang);
