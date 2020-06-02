module.exports = {
  // presets: [
  //   [
  //     "@babel/env",
  //     {
  //       "targets": {
  //         "browsers": ["last 2 versions", "ie >= 9"]
  //       },
  //       // useBuiltIns: "usage"
  //     }
  //   ],
  //   "@babel/preset-react"
  // ],
  "plugins": [
    ["import", {
      "libraryName": "antd",
      "libraryDirectory": "es",
      "style": true // `style: true` 会加载 less 文件
    }] 
  ]
}