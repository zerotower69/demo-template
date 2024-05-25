import path  from 'path'
import {CMD} from "./vars.mjs"
import fs from 'fs'
import dayjs from 'dayjs'
import { getCurrentCommitInfo } from './git.mjs'

const CHANGELOG_PATH = path.resolve(CMD,'CHANGELOG.md')

/**
 *
 * @param {{version:string,startTime:number,message:string}} info
 */
export function writeChangelog(info){
  const originContent = fs.readFileSync(CHANGELOG_PATH,{encoding:'utf8'})
  const time = dayjs(info.startTime).format('YYYY-MM-DD HH:ss')
  //info
  const title = `\n\n## ${info.version} (${time})`
  const gitInfo = getCurrentCommitInfo();
  let content = `\n\n${info.message}`
  content=title+content
  content = '# 更新日志'+content+"\n"+originContent
  fs.writeFileSync(CHANGELOG_PATH,content,{encoding:'utf8'})
}