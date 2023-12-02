module.exports = {
    ignores: [(commit) => commit.includes('init')],
    extends: ['@commitlint/config-conventional'],
    rules: {
        'body-leading-blank': [2, 'always'],
        'footer-leading-blank': [1, 'always'],
        'header-max-length': [2, 'always', 108],
        'subject-empty': [2, 'never'],
        'type-empty': [2, 'never'],
        'subject-case': [0],
        'type-enum': [
            2,
            'always',
            [
                'feat', // 新功能，比如 feat: login
                'fix', // 修补 bug
                'perf', // 优化相关，比如提升性能、体验
                'style', // 不影响代码含义的修改，比如空格、格式化、缺失的分号等，而不是 css 修改
                'docs', // 新增或修改文档
                'test', // 增加测试代码或者修改已存在的测试
                'refactor', // 重构（即不是新增功能，也不是修改bug的代码变动）
                'build', // 对构建系统或者外部依赖项进行了修改
                'ci', // 持续集成相关文件修改
                'chore', // 构建过程或辅助工具的变动
                'revert', // 恢复上一次提交
                'wip', // 开发中
                'workflow', // 工作流相关文件修改
                'types', // 类型
                'release', // 发布新版本
            ],
        ],
    },
}
