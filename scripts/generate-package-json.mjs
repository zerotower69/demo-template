#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import chalk from 'chalk';
import { getAllAppName, loadPackageJson, loadTemplatePackageJson } from './common.mjs';
import ora from 'ora';
(function run(modes) {

  const spinner =ora({
    text:"generate package.json ...",
    color:'white'
  })
  spinner.start()
  const templatePkg = loadTemplatePackageJson();
  const localPkg = loadPackageJson();
  templatePkg.name = ` blog-server`;
  templatePkg.description = localPkg.description
  templatePkg.author =localPkg.author;
  templatePkg.LISENCE = localPkg.LISENCE;
  templatePkg.keywords = localPkg.keywords;
  templatePkg.scripts = {
    "copy-proto": "cp  -r proto dist/proto",
  }
  //生成多个app的运行命令
  const apps = getAllAppName()
  for(const mode of modes){
    const appTags = []
     for(const app of apps){
       const tag = `start:${app}:${mode}`
       appTags.push(tag)
      templatePkg.scripts[tag] = `cross-env RUNNING_ENV=${mode} node ./dist/apps/${app}/main.js`
     }
     templatePkg.scripts[`start-all:${mode}`] = `npm-run-all -p --print-label ${appTags.join('  ')}`
  }
  templatePkg.engines = localPkg.engines;
  templatePkg.dependencies = localPkg.dependencies;
  templatePkg.packageManager = 'pnpm';
  fs.writeFileSync(path.resolve(process.cwd(),"package-tmp.json"), JSON.stringify(templatePkg, null, 2))
  spinner.stop()
  console.log(chalk.green('generate package.json success'))
})(["prod","dev"]);
