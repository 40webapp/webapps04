import Express from 'express';
const app = Express();
import logger from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { Authentication } from './controllers/auth/index';

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 30 * 60 * 1000
  }
}));

Authentication.initialize(app);
Authentication.setStrategy();

// ログインの強制
app.use((req, res, next) => {
  if (req.isAuthenticated())
    return next();
  if (req.url === '/' || req.url === '/login')
    return next();
  res.redirect('/login');
});

// ルーティング
import index from './routes/index';
import login from './routes/login';
import payment from './routes/expenses/payment';
import submit from './routes/expenses/submit';

app.use('/', index);
app.use('/expenses/payment', payment);
app.use('/login', login);
app.use('/expenses/submit', submit);

app.use((req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
  var err: any = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err: any, req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('エラーが発生しました');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

export default app;