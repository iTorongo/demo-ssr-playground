import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import * as express from 'express';
import * as path from 'path';
import { ngExpressEngine } from '@nguniversal/express-engine';

const distFolder = path.join(process.cwd(), 'dist', 'ssr-playground');
import { AppServerModuleNgFactory } from './dist/ssr-playground-server/main';

const app = express();

app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory
}));

app.set('view engine', 'html');
app.set('views', distFolder);

// Static assets
app.get('*.*', express.static(distFolder));

// Universal
app.get('*', (req, res) => {
  res.render('index', { req });
});

app.listen(4000, () => {});