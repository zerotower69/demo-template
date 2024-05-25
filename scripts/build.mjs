import inquirer from 'inquirer'
import semver from 'semver'
import chalk from 'chalk'
import consola from 'consola'
import { execSync } from 'child_process'
import path from 'path'
import fs from 'fs'
import { getVersion, setVersion } from './version.mjs'
import { getCurrentCommitInfo, getGitUser } from './git.mjs'
import { buildImage, dockerIsRunning, exitDocker } from './docker.mjs'
import { writeChangelog } from './changelog.mjs'
import { CMD } from './vars.mjs'
function prompt(){

  //get current version
  const currentVersion = getVersion()
  const username =  getGitUser();
  const info = getCurrentCommitInfo()

  const hasDocker = exitDocker()

  const versions ={
    major: semver.inc(currentVersion,'major'),
    minor:semver.inc(currentVersion,'minor'),
    patch:semver.inc(currentVersion,'patch'),
    prerelease:semver.inc(currentVersion,'prerelease','beta')
  }

  /**
   * questions for inquirer
   * @type {import('inquirer').Question[]}
   */
  const questions = [
    //step1: build mode
    {
      type:"list",
      name:"mode",
      message:"请选择打包模式：",
      choices:[
        {name:`测试打包`,value:"test"},
        {name:"本地开发打包",value:"development"},
        {name:"生产打包",value:"production"}
      ]
    },
    //step2: ask to generate version
    {
      type:"confirm",
      name:'updateVersion',
      message:`是否更新版本号(当前版本：${currentVersion})?`,
    },
    //step3: the mode of version
    {
      type:"list",
      name:"version",
      message:`请选择你要更新的版本号模式，当前版本号：${currentVersion}`,
      choices: [
        {name:`大的版本迁移，新建分支，项目结构改变，或者破坏式不兼容的升级(${versions.major})`,value:versions.major},
        {name:`新增功能，增加新的库包等(${versions.minor})`,value: versions.minor},
        {name:`bug的修复，样式调整、文档修改等(${versions.patch})`,value: versions.patch},
        {name:`预览功能打包(${versions.prerelease})`,value: versions.prerelease}
      ],
      when:(answers)=>{
        return answers.updateVersion
      }
    },
    //step4: ask to generate changelog
    {
      type:"confirm",
      name:"useLog",
      message:"是否生成changelog",
      when:(answers)=>{
         return answers.updateVersion
      }
    },
    //step5: input changelog info, default is latest commit message
    {
      type:"input",
      name:"logInfo",
      message:"请输入changelog说明(默认为最新提交信息)",
      default:info.message,
      when:(answers)=>{
        return answers.useLog
      }
    },
    //step6: ask use docker or not
    {
      type:"confirm",
      name:'useDocker',
      message:'是否打包生成docker镜像？',
      when:()=>hasDocker
    },
    {
      type:"input",
      name:"imageName",
      message:"请输入你的镜像名：",
      default:'web-app',
      when:(answers)=>answers.useDocker
    }
  ]

  return inquirer.prompt(questions)
}

//record info
function recordBuildInfo(){

}

(function main(){
  prompt().then((answers)=>{
    const {updateVersion,mode} =answers
    const version = answers.version || getVersion()
    const outputPath = `./output/${mode}/dist(${version})`
    if(updateVersion){
      console.info(chalk.blue(`更新应用版本：${getVersion()}`))
      setVersion(answers.version)
      consola.success(chalk.green('版本号修改成功'))
    }
    // start build
    consola.info('开始打包...')
    //vite
    const buildCommand = `vite build --mode ${answers.mode}`
    consola.info(buildCommand)
    const startTime = Date.now()
    execSync(buildCommand,{stdio:'inherit',encoding:'utf8'});
    consola.success(chalk.green('打包完成.'))
    const buildEndTime = Date.now()
    if(answers.useLog){
      writeChangelog({version:answers.version,startTime:startTime,message:answers.logInfo})
    }
    if(answers.useDocker){
      if(!dockerIsRunning()){
        consola.error(chalk.red('docker进程暂未启动'))
      } else{
        consola.info(chalk.blue('docker开始打包'))
        const imageName = answers.imageName
        const outputName = `docker/${answers.mode}/${imageName}-${version}.tar`
        const configPath = `Dockerfile-${answers.mode}`
        const author = getGitUser()
        //create use buildx instance
        execSync(`docker buildx create --use`);
        mkdir(`docker/${mode}`)
        execSync(`docker build -f ${configPath} -t ${imageName}:${version} -o type=tar,dest=${outputName} .`)
        consola.success(chalk.green('docker 打包成功'))
      }
    }
    mkdir(outputPath)
    fs.cpSync('./dist',outputPath,{recursive:true})
    fs.rmSync('./dist',{recursive:true})
    consola.success(chalk.green('******本地打包完成******'))
  }).catch((err)=>{
    console.log(err)
  })
})()


/**
 *
 * @param {string} pathstr
 */
function mkdir(pathstr){
  const paths = pathstr.split('/').filter(item=>!item.includes('.'));
  let current = CMD;
  while (paths.length){
    current = current+'/'+paths.shift()
    if(!fs.existsSync(current)){
      fs.mkdirSync(current)
    }
  }
}

