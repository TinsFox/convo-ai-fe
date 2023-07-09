export default function sse(req, res) {
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')
  res.setHeader('Access-Control-Allow-Origin', '*')

  const sendEvent = (data) => {
    res.write(`data: ${JSON.stringify(data)}\n\n`)
  }

  // 在这里可以添加逻辑，根据需要发送 SSE 事件

  // 示例：每秒发送一个时间戳事件
  const intervalId = setInterval(() => {
    sendEvent({ timestamp: Date.now() })
  }, 1000)

  // 关闭连接时停止发送事件
  req.on('close', () => {
    clearInterval(intervalId)
    res.end()
  })
}
