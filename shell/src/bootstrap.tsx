/*
 *
 * MIT License.
 *
 */
import { App } from '@src/App';
import * as React from 'react';
import ReactDOM from 'react-dom/client';
import 'semantic-ui-css/semantic.min.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <div className="app-content-container">
      <App />
    </div>
  </React.StrictMode>
);
