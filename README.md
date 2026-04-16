# Hare CLI

`hare-cli` 是独立于 `hare-code` SDK 的命令行宿主包。  
它消费同工作区里的 `hare-code` 源码来构建 CLI，但发布产物只包含自己的 `dist/cli.js` 与二进制入口。

当前它还是 sibling 目录，不是独立 git 仓库；`.github/workflows/release.yml` 已按独立仓库形态准备好，后续提仓即可直接启用。

## 版本联动

当前以 sibling SDK 包 `../hare-code` 的版本号为真源。`hare-cli` 与 `hare-code-desktop` 都跟随它。发布前建议先在 `hare-code` 目录执行：

```bash
node scripts/sync-sibling-version.mjs --only hare-cli
node scripts/check-sibling-version.mjs --only hare-cli
```

如果要一次性校验整个 sibling 产品线，也可以执行：

```bash
node scripts/sync-sibling-version.mjs
node scripts/check-sibling-version.mjs
```

## 本地开发

```bash
bun run build
node bin/hare-cli.cjs --version
```

## Release 产物

- `hare-cli-windows-x64.exe`
- `hare-cli-linux-x64`
- `hare-cli-linux-x64-baseline`
- `hare-cli-linux-arm64`
- `hare-cli-darwin-x64`
- `hare-cli-darwin-arm64`
- `hare-cli-<version>.tgz`
