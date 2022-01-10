import React from 'react';
import { render } from 'react-dom';

import './index.css';

const App = () => (
    <div>
        <h1>React App Set Successfully</h1>
        <h3>Date: {new Date().toDateString()}</h3>
    </div>
);

const root = document.getElementById('app');

// Bootstrap the main app
render(<App />, root);