module.exports = {
  presets: [
    [
      "@babel/env",
      {
        "targets": {
          "browsers": ["last 2 versions", "ie >= 10"]
        },
        // useBuiltIns: "usage"
      }
    ],
    "@babel/preset-react"
  ],
  "plugins": [
    ["import", {
      "libraryName": "antd",
      "libraryDirectory": "es",
      "style": true // `style: true` 会加载 less 文件
    }]
  ]
}