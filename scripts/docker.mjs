import os from 'os'
import {execSync} from "child_process"
import fs from 'fs'
import path from 'path'
import { CMD } from './vars.mjs'

/**
 * docker command exit
 * @return {boolean}
 */
export function exitDocker(){
  const platform=os.platform()
  const command = platform ==='win32' ? 'where docker':'which docker'
  try{
    execSync(command).toString('utf8')
    return true
  } catch (e){
    return false
  }
}

/**
 *
 * @param {string} filepath
 */
export function checkConfigPath(filepath){
  return fs.existsSync(path.resolve(CMD,filepath))
}

/**
 * check docker deamon
 * @return {boolean}
 */
export function dockerIsRunning(){
  try{
    execSync('docker info')
    return true
  } catch (e){
    return false
  }
}

export function beforeValidate(){

}

/**
 *
 * @param {string} name
 */
export function buildImage(name){
   try{
     execSync(`docker ps -q --filter ancestor=${name}`)
   } catch (e){

   }
}