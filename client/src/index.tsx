import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { store } from './store';
import { Provider } from 'react-redux';
import applyInteceptor from './utils/interceptor';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

applyInteceptor(store);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
