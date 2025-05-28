# 图片放置说明

## 如何添加文具盒图片

请将您的两张文具盒图片按照以下方式放置：

### 1. 关闭的文具盒
- 文件名：`pencil-case-closed.png`
- 放置位置：`public/images/pencil-case-closed.png`
- 说明：这是默认显示的关闭状态文具盒图片

### 2. 打开的文具盒
- 文件名：`pencil-case-opened.png`
- 放置位置：`public/images/pencil-case-opened.png`
- 说明：点击文具盒后显示的打开状态图片

## 操作步骤

1. 在项目根目录下，确保存在 `public/images/` 文件夹
2. 将您的"关闭的文具盒.png"重命名为"pencil-case-closed.png"并放入 `public/images/` 文件夹
3. 将您的"打开的文具盒.png"重命名为"pencil-case-opened.png"并放入 `public/images/` 文件夹
4. 启动开发服务器：`npm run dev`
5. 在浏览器中查看效果

## 图片要求

- 格式：PNG（推荐，支持透明背景）
- 尺寸：建议宽度在400-800px之间，高度自适应
- 背景：建议使用透明背景或纯色背景

## 功能说明

- 默认显示关闭状态的文具盒
- 点击文具盒会切换到打开状态
- 打开状态下会显示"向下滚动探索每一件文具的故事..."的提示
- 包含悬停效果和平滑过渡动画
- 响应式设计，适配不同屏幕尺寸 