module.exports = {
  presets: [
    "@babel/preset-react"
  ],
  plugins: [
    ["import", {
      "libraryName": "antd",
      "libraryDirectory": "es",
      "style": true // `style: true` 会加载 less 文件
    }],
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-proposal-class-properties",
    "@babel/transform-runtime",
  ]
}