console.info('contentScript is running')

// 检测当前页面是否在微信公众号管理后台
const isWechatMP = window.location.hostname === 'mp.weixin.qq.com'

// 发送消息给 background script
chrome.runtime.sendMessage({ type: 'CHECK_DOMAIN', isWechatMP })

// 如果不在微信公众号管理后台，添加禁用样式
if (!isWechatMP) {
  // 创建样式元素
  const style = document.createElement('style')
  style.textContent = `
    body {
      cursor: not-allowed !important;
    }
  `
  document.head.appendChild(style)
}
