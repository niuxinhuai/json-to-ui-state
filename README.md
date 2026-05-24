# json-to-ui-state

Generate normal, empty, long-text, missing-field, edge-number, and error fixtures from one JSON response.

从一份 JSON 响应生成 normal、empty、long text、missing field、edge number、error 等 UI 验收状态。

## English

### Install

```bash
npm install -g json-to-ui-state
```

For local development:

```bash
npm install
npm link
json-to-ui-state --help
```

### Usage

Feed it a JSON response and use the generated output in frontend or mobile previews.

```bash
json-to-ui-state response.json
json-to-ui-state response.json --out fixtures.json
```

Try the included example:

```bash
json-to-ui-state examples/response.json
```

### Status

This is an MVP designed to be useful immediately and easy to extend. It has no runtime dependencies and targets Node.js 18+.

### Test

```bash
npm test
```

## 中文

### 安装

```bash
npm install -g json-to-ui-state
```

本地开发：

```bash
npm install
npm link
json-to-ui-state --help
```

### 用法

输入一份接口 JSON，把生成结果用于前端或移动端页面预览与验收。

```bash
json-to-ui-state response.json
json-to-ui-state response.json --out fixtures.json
```

试试内置示例：

```bash
json-to-ui-state examples/response.json
```

### 当前状态

这是一个可以直接使用的 MVP，重点是小、清晰、容易二次开发。运行时无第三方依赖，要求 Node.js 18+。

### 测试

```bash
npm test
```

## License

MIT
