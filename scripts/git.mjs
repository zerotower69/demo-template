import {execSync} from "child_process"
import dayjs from 'dayjs'

//get git user
export function getGitUser(){
 return execSync('git config user.name').toString('utf8')
}

/**
 * get current info
 * @return {{date: string, author: string, id: string, message: string, email: string}}
 */
export function getCurrentCommitInfo(){
  const message = execSync(`git log -1 --pretty=format:"%H#%s#%an#%ad#%ae"`).toString('utf8')
  const list = message.split('#')
  return {
    id: list[0],
    message:list[1],
    author:list[2],
    date:dayjs(list[3]).format('YYYY-MM-DD HH:mm:ss'),
    email:list[4]
  }
}