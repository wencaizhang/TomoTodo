## 通过 npm 导入第三方库

第一步：使用 npm 安装

以有赞小程序组件库为例，首先在根目录下执行：

```bash
npm i vant-weapp -S --production
```

第二步，构建 npm

在微信开发者工具的“工具”菜单下，有一项“构建npm”的选项，点击即可。

第三步：在代码中引入组件

可以在根目录下的 app.json 文件中引入，也可以在需要调用第三方组件的页面对应的 json 文件下引入。

引入代码如下：

```json
{
  "usingComponents": {
    "van-stepper": "/miniprogram_npm/vant-weapp/stepper/index"
  }
}
```

第四步：尽情使用，enjoy！

按照上面步骤操作，但是在使用的时候偶尔仍然会报错，此时可以做如下检查：

+ 确认组件引用路径是否正确
+ 重启微信开发者工具
+ 升级微信开发者工具到最新版

