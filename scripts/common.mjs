import fs from 'node:fs';
import path from 'node:path';
import {spawn} from "child_process"

export function loadPackageJson() {
  const packageJson = fs.readFileSync(path.resolve(process.cwd(), 'package.json'), 'utf-8');
  return JSON.parse(packageJson);
}

export function loadTemplatePackageJson(){
  const templatePackageJson = fs.readFileSync(path.resolve(process.cwd(), 'templates/package.app.json'), 'utf-8');
  return JSON.parse(templatePackageJson);
}

//执行命令
export function runCommand(cmd,args){
  return new Promise((resolve,reject)=>{
    const command = spawn(cmd,args,{shell:true})
    command.stdout.on("data",(data)=>{
      process.stdout.write(data.toString())
    })
    command.stderr.on("data",(data)=>{
      // process.stdout.write(data.toString())
      reject(data.toString())
    })
    command.on("close",()=>{
      resolve()
    })
  })
}

//获取所有app名称
export function getAllAppName(){
  const apps = fs.readdirSync(path.resolve(process.cwd(), 'apps'))
  return apps.filter((file)=>{
    return fs.statSync(path.resolve(process.cwd(), 'apps', file)).isDirectory()
  })
}

//获取所有的微服务名称
export function getAllSubAppName(){
  return getAllAppName().filter(name=>name!=='gateway')
}
