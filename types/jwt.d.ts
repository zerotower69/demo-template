//JWTModule相关配置
export type JWTConfig = {
  //jwt 秘钥
  secret: string;
  //过期时间 https://github.com/vercel/ms. 2 days| 1y | 10h | 7d
  expireIn: string;
  //refresh token过期时间
  refreshExpireIn: string;
};
