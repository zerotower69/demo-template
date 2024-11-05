#!/usr/bin/env node

import * as commander from 'commander';
import fs from 'node:fs';
import path from 'node:path';
import chalk from 'chalk';
import {exec,spawn,spawnSync} from "child_process"
import { loadPackageJson, runCommand } from './common.mjs';
import ora from "ora"


(function run() {
  function printColorfulText(text, color) {
    console.log(chalk[color](text));
  }
  const program = new commander.Command();
  program.version('1.0.0');
  const getAllAvailableApps = fs
    .readdirSync(path.resolve(process.cwd(), 'apps'))
    .filter((file) =>
      fs.statSync(path.resolve(process.cwd(), 'apps', file)).isDirectory(),
    );
  const pkgJson = loadPackageJson();
  program
    .requiredOption(
      '-n ,--name <sname>',
      `service name which you want to generate(${chalk.blue(getAllAvailableApps.join('|'))})`,
    )
    .option(
      '-t,--tag <tag>',
      `${chalk.blue('tag')} is the tag of the image, default is ${pkgJson.version}`,
      pkgJson.version,
    );
  program.parse(process.argv);

  const options = program.opts();
  if (!getAllAvailableApps.includes(options.name)) {
    console.log(
      chalk.red(
        `service name ${options.name} is not available, you must choose one of ${chalk.blue(getAllAvailableApps.join('|'))}`,
      ),
    );
    process.exit(0);
  }
  //开始执行
  console.log(chalk.yellow(`prepare build app:${options.name}`))
  const spinner = ora({
    text:`prepare app: ${options.name}`,
    color:"blue",
  })
  spinner.start("building...")
  const result = spawnSync('nest',['build',`${options.name}`],{
    cwd:process.cwd(),
    stdio: 'inherit',
    //windows系统下需要将shell设置为true
    shell:process.platform === 'win32'
  })
  spinner.stop()
  if(result.status === 0){
    console.log(chalk.green(`build app:${options.name} success`))
  }else{
    console.log(chalk.red(`build app:${options.name} failed`))
    process.exit(0);
  }
})();

