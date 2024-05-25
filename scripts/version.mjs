import fs from "fs"
import {PKG_PATH,CMD} from "./vars.mjs"
import semver from "semver"

/**
 * get package.json info
 * @return {Record<string,any>}
 */
export function getPKG(){
  const text=fs.readFileSync(PKG_PATH,'utf8');
  return JSON.parse(text)
}

/**
 * get app version
 * @return {string}
 */
export function getVersion(){
  return process.env['npm_package_version']
}

/**
 * set app version
 * @param {string} version
 * @return boolean
 */
export function setVersion(version){
  try{
    const pkg = getPKG();
    pkg.version = version;
    fs.writeFileSync(PKG_PATH,JSON.stringify(pkg,null,2))
    return true
  } catch (e){
    return false
  }
}
