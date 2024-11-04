import { env, cwd } from 'process';
import * as fs from 'fs';
import { parse } from 'yaml';
import * as path from 'path';
import type { GlobalConfig } from '@types';

type RUNNING_TYPE = 'dev' | 'prod';

// 获取项目运行环境
export const getEnv = (): string => {
  return (env as { RUNNING_ENV: RUNNING_TYPE } & { [K in string]: string })
    .RUNNING_ENV;
};
export const IS_DEV = getEnv() === 'dev';
// 读取项目配置
export function getConfig(): GlobalConfig {
  const environment = getEnv();
  let localConfig: GlobalConfig;
  try {
    const localYamlPath = path.join(cwd(), './application.local.yaml');
    const localFile = fs.readFileSync(localYamlPath, 'utf8');
    localConfig = parse(localFile) as GlobalConfig;
  } catch (e) {}
  const yamlPath = path.join(cwd(), `./application.${environment}.yaml`);
  const file = fs.readFileSync(yamlPath, 'utf8');
  const config: GlobalConfig = parse(file) as GlobalConfig;
  const mergeConfig: GlobalConfig = {
    ...localConfig,
    ...config,
  };
  return {
    ...mergeConfig,
  };
}
export const GLOBAL_CONFIG: GlobalConfig = getConfig();
