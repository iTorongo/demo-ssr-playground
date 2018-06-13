// These are important and needed before anything else
import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import * as express from 'express';
import * as path from 'path';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { AppServerModuleNgFactory } from './dist/ssr-playground-server/main';

const app = express();
const distFolder = path.join(process.cwd(), 'dist', 'ssr-playground');

app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory
}));

app.set('view engine', 'html');
app.set('views', distFolder);

// Serve static files
app.get('*.*', express.static(distFolder));

// Universal engine
app.get('*', (req, res) => {
  res.render('index', { req });
});

app.listen(4000, () => console.log('Running on http://localhost:4000'));
