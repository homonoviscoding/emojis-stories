import loader from '../../assets/loader.gif'
import './LoadingScreen.css'

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <img src={loader} alt="loader" />
    </div>
  )
}

export default LoadingScreen
