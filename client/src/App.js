import React from 'react';
import { IntlProvider } from 'react-intl';
import { getLocale } from './locales';
import { App as AppRouter } from './routes';
import ModalsProvider from './contexts/Modals';
import NetworkProvider from './contexts/Network';
import NewsProvider from './contexts/News';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'assets/css/defiat.css';
import 'assets/css/nucleo-icons.css';
import 'assets/css/demo.css';
import 'react-toastify/dist/ReactToastify.css';
import 'assets/css/fonts.css'

export const App = () => {
  const locale = getLocale();

  return (
    <IntlProvider locale={locale.locale} messages={locale.messages}>
      <NetworkProvider>

        <NewsProvider>
        <ModalsProvider>
          <AppRouter />
        </ModalsProvider>
        </NewsProvider>
      </NetworkProvider>
    </IntlProvider>
  );
}
