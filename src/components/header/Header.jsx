import './header.css'
import icon from '../../assets/icon.png'

export default function Header () {

    return (
        <header>
            <img src={icon} alt="icon" />
            <h1>Emojis Stories</h1>
        </header>
    )

}