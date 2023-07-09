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
          // axios.post('/api/chat?human_msg=what%20did%20i%20send%20you%20just%20now').then((res) => {
          //   console.log(res)
          // })
          fetch(
            'https://convoai-production.up.railway.app/tts?text=Access%20to%20fetch%20at%20%27https%3A%2F%2Fconvoai-production.up.railway.app%2Fchat%3Fhuman_msg%3Dwhat%2520did%2520i%2520send%2520you%2520just%2520now%27%20%28redirected%20from%20%27http%3A%2F%2Flocalhost%3A3000%2Frailway%2Fchat%3Fhuman_msg%3Dwhat%2520did%2520i%2520send%2520you%2520just%2520now%27%29%20from%20origin%20%27http%3A%2F%2Flocalhost%3A3000%27%20has%20been%20blocked%20by%20CORS%20policy%3A%20No%20%27Access-Control-Allow-Origin%27%20header%20is%20present%20on%20the%20requested%20resource.%20If%20an%20opaque%20response%20serves%20your%20needs%2C%20set%20the%20request%27s%20mode%20to%20%27no-cors%27%20to%20fetch%20the%20resource%20with%20CORS%20disabled.'
          )
        }}
      >
        测试
      </button>
    </div>
  )
}

export default MyPage
