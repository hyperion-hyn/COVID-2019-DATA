import { findLocale, defaultLocale } from "../locale";
import { LangaugeActions } from "../actions/language";

let selectedLocale = defaultLocale;

const initState = {
  ...selectedLocale
};

export default function localeReducer(state = initState, action) {
  switch (action.type) {
    case LangaugeActions.CHANGE_LANGUAGE:
      let locale = findLocale(action.lang);
      return { ...locale };
    default:
      return state;
  }
}
