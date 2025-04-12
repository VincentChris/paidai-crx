console.log('background is running')

// 监听来自 content script 的消息
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'CHECK_DOMAIN') {
    // 更新扩展图标状态
    chrome.action.setIcon({
      path: message.isWechatMP
        ? {
            16: 'img/paidai-16.png',
            32: 'img/paidai-32.png',
            48: 'img/paidai-48.png',
            128: 'img/paidai-128.png',
          }
        : {
            16: 'img/paidai-disabled-16.png',
            32: 'img/paidai-disabled-32.png',
            48: 'img/paidai-disabled-48.png',
            128: 'img/paidai-disabled-128.png',
          },
    })

    // 设置图标标题（hover 提示）
    chrome.action.setTitle({
      title: message.isWechatMP
        ? '微信公众号管理助手'
        : '该功能仅在微信公众号管理后台可用',
    })

    // 设置是否启用弹窗
    chrome.action.setPopup({
      popup: message.isWechatMP ? 'popup.html' : ''
    })
  }
})

// 监听标签页更新事件
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    const isWechatMP = new URL(tab.url).hostname === 'mp.weixin.qq.com'
    chrome.action.setIcon({
      path: isWechatMP
        ? {
            16: 'img/paidai-16.png',
            32: 'img/paidai-32.png',
            48: 'img/paidai-48.png',
            128: 'img/paidai-128.png',
          }
        : {
            16: 'img/paidai-disabled-16.png',
            32: 'img/paidai-disabled-32.png',
            48: 'img/paidai-disabled-48.png',
            128: 'img/paidai-disabled-128.png',
          },
    })
    chrome.action.setTitle({
      title: isWechatMP
        ? '微信公众号管理助手'
        : '该功能仅在微信公众号管理后台可用',
    })
    // 设置是否启用弹窗
    chrome.action.setPopup({
      popup: isWechatMP ? 'popup.html' : ''
    })
  }
})
