import express from 'express';
import cors from 'cors';
import path from 'path';
import http from 'http';
import cookieParser from 'cookie-parser';
import { Server } from 'socket.io';
import menuController from './controllers/menuController';
import customerController from './controllers/customerController';
import { Customer, Cook } from '@prisma/client';
import cookController from './controllers/cookController';
import { handleError } from './utils/middlewares';
import orderController from './controllers/orderController';
import userController from './controllers/userController';
import adminController from './controllers/adminController';
import { CLIENT_URL } from './utils/vars';

const PORT = process.env.PORT || 3001;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      customer: Partial<Customer>,
      cook: Partial<Cook>,
      isAdmin: boolean,
      ioSocket: Server,
    }
  }
}

const app = express();
const server = http.createServer(app);
const ioSocket = new Server(server, {
  cors: {
    origin: CLIENT_URL,
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// ioSocket.on('connection', (s) => {
//   console.log(`${s.id} connected`);
//   s.on('disconnect', () => {
//     console.log(`${s.id} disconnected`);
//   });
// });

app.use(express.static(path.join(__dirname, 'public')));

app.use(cors({
  origin: CLIENT_URL,
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(function(_, res, next) {
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use((req, _, next) => {
  req.ioSocket = ioSocket;
  next();
});

app.use('/api/v1/menu', menuController);
app.use('/api/v1/user', userController);
app.use('/api/v1/admin', adminController);
app.use('/api/v1/customer', customerController);
app.use('/api/v1/cook', cookController);
app.use('/api/v1/order', orderController);

app.use(handleError);

server.listen(PORT, () => {
  console.log(`🚀 Server started at http://localhost:${PORT}`);
});
