import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import * as express from 'express';
import * as path from 'path';
import { ngExpressEngine } from '@nguniversal/express-engine';

const distFolder = path.join(process.cwd(), 'dist', 'ssr-playground');


