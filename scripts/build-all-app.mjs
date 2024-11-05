#!/usr/bin/env node

import { getAllAppName } from './common.mjs';
import { spawnSync } from 'child_process';
import chalk from 'chalk';

(function run(){
  //1.先执行install命令
  //2.再执行build命令
  const apps = getAllAppName()
  for(let i=0;i<apps.length;i++){
    const app = apps[i]
    const result = spawnSync('single-build',['-n',`${app}`],{
      cwd:process.cwd(),
      stdio: 'inherit',
      //windows系统下需要将shell设置为true
      shell:process.platform === 'win32'
    })
    if(result.status === 0){
    }else{
      console.log(`${chalk.blue("[build-all app]")}${chalk.red("build all app failed")}`)
      process.exit(0);
    }
  }
  console.log(`${chalk.blue("[build-all app]")}${chalk.green("build all app success")}`)
})()
