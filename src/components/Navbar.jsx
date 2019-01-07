import React from "react"
import reme from "../reme.png"

export default class extends React.Component {
    render() {
        return (
            <nav className="navbar is-black">
                <div className="container">
                    <div className="navbar-brand">
                        <a href="/" className="navbar-item">
                            <img src={reme} alt="Reme by Degreat"/>
                        </a>
                    </div>
                </div>
            </nav>
        )
    }
}