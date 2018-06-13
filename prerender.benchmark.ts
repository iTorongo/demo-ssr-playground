// These are important and needed before anything else
import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import * as express from 'express';
import * as mkdirp from 'mkdirp';
import * as path from 'path';
import * as fs from 'fs';

import { renderModuleFactory } from '@angular/platform-server';

import { AppServerModuleNgFactory } from './dist/ssr-playground-server/main';
import { renderModuleFactoryMany } from './server-utils';
import { enableProdMode } from '@angular/core';

enableProdMode();

const routesSet = [
  '/',
  '/dashboard',
  '/item/bed',
  '/item/book',
  '/item/garden',
  '/item/fridge'
];

// build list of 600 routes
const routes = [];
for (let i = 0; i < 100; i++) {
  routes.push(...routesSet);
}



const distFolder = path.join(process.cwd(), 'dist', 'ssr-playground');
const indexHtml = fs.readFileSync(path.join(distFolder, 'index.html')).toString();


(async () => {
  console.time('renderRoutesNormal');
  await renderRoutesNormal(distFolder, indexHtml, routes);
  console.timeEnd('renderRoutesNormal');

  console.time('renderRoutesHacked');
  await renderRoutesHacked(distFolder, indexHtml, routes);
  console.timeEnd('renderRoutesHacked');
})();


function renderRoutesNormal(parentFolder: string, document: string, routeList: string[]) {
  return Promise.all(routeList.map((url) => renderModuleFactory(AppServerModuleNgFactory, { document, url })))
    .then(htmls => Promise.all(routeList.map((route, i) => {
      const html = htmls[i];
      return writeFileForRoute(route, html, distFolder, 'n' + i.toString());
    })));
}

function renderRoutesHacked(parentFolder: string, document: string, routeList: string[]) {
  renderModuleFactoryMany(AppServerModuleNgFactory, { document }, routeList)
    .then(htmls => Promise.all(routeList.map((route, i) => {
      const html = htmls[i];
      return writeFileForRoute(route, html, distFolder, 'h' + i.toString());
    })));
}


function writeFileForRoute(route: string, html: string, parentFolder: string, prefix: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const folder = path.join(parentFolder, 'prerendered', prefix, route);
    mkdirp(folder, () => {
      fs.writeFile(path.join(folder, 'index.html'), html, () => {
        resolve();
      });
    });
  });
}
