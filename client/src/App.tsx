import React, { useState, ChangeEvent } from 'react';
import { Input, Icon, Modal }  from 'antd';
import { Dashboard } from './components/dashboard';

import './App.css';
import 'antd/dist/antd.css';

const App: React.SFC = () => {
  const [accountId, setAccountId] = useState<null | string>(null);
  const [inputVal, setInputVal] = useState('');

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    const {
      target: { value },
    } = event;
    if (/[^\d]/.test(value)) return;
    setInputVal(value);
  }

  function handleOk() {
    setAccountId(inputVal);
  }

  return (
    <div
      style={{
        height: '100vh',
      }}>
      {accountId && <Dashboard accountId={accountId} />}
      <Modal title="Enter an account ID" visible={!accountId} onOk={handleOk} onCancel={() => {}}>
        <Input
          prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder="Account Id"
          value={inputVal}
          onChange={handleChange}
        />
      </Modal>
    </div>
  );
};

export default App;
