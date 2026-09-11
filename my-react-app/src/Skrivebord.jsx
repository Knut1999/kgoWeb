import '98.css'
import './Skrivebord.css'

function Skrivebord() {
  return (
    <div className="monitor">
      <div className="screen">

        <img
          className="wallpaper"
          src="/lisWallpaper.webp"
          alt=""
        />

        <div className="desktop-icons">

          <div className="desktop-icon">
            <div className="desktop-icon-image">💻</div>
            <span>Min datamaskin</span>
          </div>

          <div className="desktop-icon">
            <div className="desktop-icon-image">📁</div>
            <span>Mine dokumenter</span>
          </div>

          <div className="desktop-icon">
            <div className="desktop-icon-image">🌐</div>
            <span>Internet Explorer</span>
          </div>

          <div className="desktop-icon">
            <div className="desktop-icon-image">🗑️</div>
            <span>Papirkurv</span>
          </div>

        </div>

        <div className="taskbar">
          <button className="start-button">
            <span className="windows-logo">⊞</span>
            Start
          </button>

          <div className="taskbar-divider" />

          <div className="quick-launch">
            <span>🌐</span>
            <span>📁</span>
          </div>

          <div className="taskbar-space" />

          <div className="system-tray">
            🔊
            <span>14:27</span>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Skrivebord

