import Vue from 'vue';
import VueI18n from 'vue-i18n';

import getMessages from './localize';

Vue.use(VueI18n);

export default async ({ app, store }) => {
  app.i18n = new VueI18n({
    locale: store.state.locale,
    fallbackLocale: 'en',
    messages: await getMessages()
  });

  app.i18n.path = (link) => {
    if (app.i18n.locale === app.i18n.fallbackLocale) return `/${link}`;
    return `/${app.i18n.locale}/${link}`;
  }
}
