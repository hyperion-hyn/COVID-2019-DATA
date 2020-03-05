import { updateIntl } from "react-intl-redux";

export class LangaugeActions {
  static CHANGE_LANGUAGE = "changeLanguage";
  // static UPDATE_LOCALES = "UPDATE_LOCALES";

  static changeLocale = lang => ({
    type: LangaugeActions.CHANGE_LANGUAGE,
    lang
  })

  // static changeLocale = (locale, messages) =>
  //   updateIntl({
  //     locale: locale,
  //     messages: messages
  //   });

  // static updateLocales = payload => ({
  //   type: LangaugeActions.UPDATE_LOCALES,
  //   payload
  // });
}
