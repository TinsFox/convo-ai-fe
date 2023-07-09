import axios from 'axios'
import { useEffect, useState } from 'react'

const MyPage = () => {
  const [data, setData] = useState('')

  return (
    <div>
      <h1>Server-Sent Events Example</h1>
      <button
        onClick={() => {
          // fetch('/api/chat?human_msg=what%20did%20i%20send%20you%20just%20now', {
          //   method: 'POST',
          // })
          axios.post('/api/chat?human_msg=what%20did%20i%20send%20you%20just%20now').then((res) => {
            console.log(res)
          })
        }}
      >
        测试
      </button>
    </div>
  )
}

export default MyPage
