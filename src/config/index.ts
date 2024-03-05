import { env, cwd } from 'process';
import * as fs from 'fs';
import { parse } from 'yaml';
import * as path from 'path';
import type { AppConfig } from '../../types/config';

// 获取项目运行环境
export const getEnv = (): string => {
  return (env as Record<string, any>).RUNNING_ENV;
};
export const IS_DEV = getEnv() === 'dev';
// 读取项目配置
export function getConfig(): AppConfig {
  const environment = getEnv();
  const yamlPath = path.join(cwd(), `./application.${environment}.yaml`);
  const file = fs.readFileSync(yamlPath, 'utf8');
  const config: AppConfig = parse(file);
  return config;
}
