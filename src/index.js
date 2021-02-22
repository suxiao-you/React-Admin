import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import MemoryUtils from './utils/memoryUtils'
import StorageUtils from './utils/storageUtils'

const user = StorageUtils.getUser()
MemoryUtils.user = user

ReactDOM.render(
    <App />,
  document.getElementById('root')
);
