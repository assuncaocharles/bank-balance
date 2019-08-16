import React, { useState } from 'react';
import { Statistic, Typography, Input, Button, List, Tag, DatePicker } from 'antd';
import { ApiService } from '../services/DataApi';
import { getTagColor } from '../utils';
import NumberFormat from 'react-number-format';
import moment from 'moment';
import { useAsyncEffect } from 'use-async-effect';

const { Title, Text } = Typography;

export const Dashboard: React.FC<{ accountId: string }> = ({ accountId }) => {
  const [value, setValue] = useState<number>(0);
  const [balance, setBalance] = useState<number>(0);
  const [message, setMessage] = useState('');
  const [history, setHistory] = useState<any[]>([]);

  useAsyncEffect(async () => {
    const {
      data: { balance, message },
    } = await ApiService.getBalance(accountId);
    const {
      data: { history },
    } = await ApiService.getHistory(accountId);
    setBalance(balance);
    setMessage(message || '');
    setHistory(history || []);
  }, [message, balance, history]);

  async function handleClick() {
    const { account } = await ApiService.executeTransaction(accountId, value);
    setBalance(account.balance);
    setHistory(account.history);
  }

  return (
    <div
      style={{
        display: 'grid',
        height: '100%',
        gridTemplateColumns: '1fr 4fr 1fr',
      }}>
      <div
        style={{
          height: '100%',
          width: 250,
          borderRight: '1px solid #d9d9d9',
          padding: 24,
        }}>
        <div>
          <Title level={4}>
            Account ID
            <div>
              <Text code>{accountId}</Text>
            </div>
          </Title>
        </div>
        {!message && (
          <Statistic
            title="Balance"
            prefix="R$"
            value={
              balance
                ? balance.toLocaleString('pt-BR', {
                    style: 'decimal',
                    minimumFractionDigits: 2,
                  })
                : 0
            }
          />
        )}
      </div>
      <div
        style={{
          padding: 24,
        }}>
        {message && <Title level={3}>{message}</Title>}
        {history.length > 0 && (
          <div>
            <Title level={2}>History</Title>
            <List
              style={{
                width: 500,
              }}
              size="large"
              bordered
              dataSource={history}
              renderItem={item => (
                <List.Item style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr' }}>
                  <Tag color={getTagColor(item.operation)}>{item.operation}</Tag>
                  <span
                    style={{
                      margin: '0px 16px',
                    }}>
                    R${' '}
                    {
                      <NumberFormat
                        value={item.value}
                        displayType="text"
                        thousandSeparator="."
                        decimalSeparator=","
                        decimalScale={2}
                        fixedDecimalScale={true}
                        allowNegative={true}
                      />
                    }
                  </span>
                  <DatePicker
                    showTime
                    format="DD/MM/YY HH:mm:ss"
                    defaultValue={moment(item.date)}
                    disabled
                  />
                </List.Item>
              )}
            />
          </div>
        )}
      </div>
      <div
        style={{
          height: '100%',
          borderLeft: '1px solid #d9d9d9',
          padding: 24,
        }}>
        <Title level={4}>New transaction</Title>
        <div>
          Value:
          <NumberFormat
            value={value}
            thousandSeparator="."
            decimalSeparator=","
            decimalScale={2}
            allowNegative={true}
            customInput={Input}
            onValueChange={newVal => {
              setValue(parseFloat(newVal.value));
            }}
          />
          <div
            style={{
              paddingTop: 16,
            }}>
            <Button type="primary" onClick={handleClick}>
              Execute
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
