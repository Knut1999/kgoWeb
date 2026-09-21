import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Scene from './Scene/Scene'
import Skrivebord from './skrivebord/Skrivebord'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Scene />} />
        <Route path="/Skrivebord" element={<Skrivebord />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App