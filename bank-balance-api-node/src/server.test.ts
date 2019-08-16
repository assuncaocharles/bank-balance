import req from 'supertest';

import server from './entry';
import { MESSAGES } from './server-messages';

const randomUserId = () => Math.floor(Math.random() * 100);
const userID = randomUserId();

test('[GET] Get Balance', async () => {
  const res = await req(server).get(`/api/balance/${userID}`);
  expect(res.body.message).toBe(MESSAGES.USER_NOT_FOUND);
});

test('[POST] Deposit Money', async () => {
  const value = 100;
  const res = await req(server)
    .post('/api/transaction')
    .send({ userID, value });
  expect(res.body.message).toBe(MESSAGES.SUCCESS_OPERATION);
  expect(res.body.result.balance).toBe(value);
});

test('[POST] Withdraw Money', async () => {
  const value = -100;
  const res = await req(server)
    .post('/api/transaction')
    .send({ userID, value });
  expect(res.body.message).toBe(MESSAGES.SUCCESS_OPERATION);
  expect(res.body.result.balance).toBe(0);
});

test('[POST] Withdraw Money NOT ALLOWED', async () => {
  const value = -100;
  const res = await req(server)
    .post('/api/transaction')
    .send({ userID, value });
  expect(res.body.message).toBe(MESSAGES.NEGATIVE_BALANCE);
  expect(res.body.result.balance).toBe(0);
});

test('[POST | GET] Correct balance after multiple requests', async () => {
  const newUserId = randomUserId();
  await req(server)
    .post('/api/transaction')
    .send({ userID: newUserId, value: 100 }); // 100
  await req(server)
    .post('/api/transaction')
    .send({ userID: newUserId, value: -100 }); // 0
  await req(server)
    .post('/api/transaction')
    .send({ userID: newUserId, value: 200 }); // 200
  await req(server)
    .post('/api/transaction')
    .send({ userID: newUserId, value: 300 }); // 500
  await req(server)
    .post('/api/transaction')
    .send({ userID: newUserId, value: -100 }); // 400
  await req(server)
    .post('/api/transaction')
    .send({ userID: newUserId, value: +500 }); // 900

  const res = await req(server).get(`/api/balance/${newUserId}`);
  expect(res.body.balance).toBe(900);
});
