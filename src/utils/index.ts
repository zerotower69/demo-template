import * as crypto from 'crypto';

//计算md5,用于密码加密等
export function md5(str: string) {
  const hash = crypto.createHash('md5');
  hash.update(str);
  return hash.digest('hex');
}

//分页offset
export function getPageOffset(page = 1, limit = 10) {
  return (page - 1) * limit;
}
