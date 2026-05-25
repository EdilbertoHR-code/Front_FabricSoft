import { AppRouter } from './routers/AppRouter';
import { I18nProvider } from './i18n/I18nProvider';
import PageTranslator from './i18n/PageTranslator';

function App() {
  return (
    <I18nProvider>
      <PageTranslator />
      <AppRouter />
    </I18nProvider>
  );
}

export default App;
