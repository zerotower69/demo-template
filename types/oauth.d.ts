//三方oauth登录
export type OauthConfig = {
  github: {
    request_token_url: string;
    request_user_url: string;
    client_id: string;
    client_secret: string;
  };
  qq?: {
    request_url: string;
  };
};
