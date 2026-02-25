const messageController = require('../controllers/messageController');
const Message = require('../models/messageModel');
const wsServer = require('../wsServer');

jest.mock('../middleware/protect', () => {
  return jest.fn(() => ({ _id: 'readerId', firstName: 'Reader', lastName: 'User' }));
});

describe('messageController.markAsRead', () => {
  let req;
  let res;

  beforeEach(() => {
    req = { params: { userId: 'senderId' } };
    res = { json: jest.fn(), status: jest.fn(() => res) };

    // mock Message.find to return some messages
    Message.find = jest.fn().mockResolvedValue([
      { _id: 'm1', sender: 'senderId', recipient: 'readerId' },
      { _id: 'm2', sender: 'senderId', recipient: 'readerId' }
    ]);

    Message.updateMany = jest.fn().mockResolvedValue({ modifiedCount: 2 });

    // mock wss
    const fakeClient = { userId: 'senderId', send: jest.fn() };
    wsServer.wss = { clients: [fakeClient] };
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('marks messages as read and broadcasts read receipts', async () => {
    await messageController.markAsRead(req, res);

    expect(Message.find).toHaveBeenCalled();
    expect(Message.updateMany).toHaveBeenCalled();

    // wss client should have been sent a read event for each message
    const client = wsServer.wss.clients[0];
    expect(client.send).toHaveBeenCalled();

    // ensure response was returned
    expect(res.json).toHaveBeenCalled();
  });
});
