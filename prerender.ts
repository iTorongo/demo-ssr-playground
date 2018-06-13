// These are important and needed before anything else
import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import * as express from 'express';
import * as mkdirp from 'mkdirp';
import * as path from 'path';
import * as fs from 'fs';

import { renderModuleFactory } from '@angular/platform-server';
import { AppServerModuleNgFactory } from './dist/ssr-playground-server/main';

const routes = [
  '/',
  '/dashboard',
  '/item/bed',
  '/item/book',
  '/item/garden',
  '/item/fridge'
];

const distFolder = path.join(process.cwd(), 'dist', 'ssr-playground');
const indexHtml = fs.readFileSync(path.join(distFolder, 'index.html')).toString();

routes.forEach(route => renderRoute(indexHtml, route));


async function renderRoute(document: string, route: string) {
  const html = await renderModuleFactory(AppServerModuleNgFactory, { document, url: route });

  const folder = path.join(distFolder, route);
  mkdirp.sync(folder);
  fs.writeFileSync(path.join(folder, 'index.html'), html);
}
