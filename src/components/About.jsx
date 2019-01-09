import React from "react"
import remeBlack from "../reme-black.png"

export default class extends React.Component {

    constructor(props) {
        super(props)
        this.state = { show: false }
    }

    show() {
        this.setState({show: true})
    }

    hide() {
        this.setState({show: false})
    }

    render() {
        const modalClass = this.state.show ? "modal is-active" : "modal"
        return (
            <div className={modalClass}>
                <div className="modal-background" onClick={() => this.hide()}>
                </div>

                <div className="modal-content">
                    <div className="box">
                        <div className="has-text-centered">
                            <img src={remeBlack} alt="Reme by GR" width="150" />
                            <p>Reme by GR <span role="img" aria-label="Rock n roll">🤟</span></p>
                        </div>
                        <br/>
                        <p>This is just a simple app to find reaction memes for tweets. You can also share yours. All for free. If you have any feedback, send me a tweet. If you want to donate anything as support, send me a tweet.</p>
                        <br/>
                        <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/me_degreat/"><i className="fab fa-twitter"></i> me_degreat</a>
                        <br/>
                        <br/>
                        <p>You can also send me an email or Whatsapp message</p>
                        <a target="_blank" rel="noopener noreferrer" href="mailto:mail@degreat.co.uk"><i className="fas fa-envelope-open"></i> mail@degreat.co.uk</a>

                        <br/>
                        <a target="_blank" rel="noopener noreferrer" href="https://wa.me/233247812093"><i className="fab fa-whatsapp"></i> Whatsapp</a>

                        <div className="has-text-centered">
                            <button className="button" onClick={() => this.hide()}>Close</button>
                        </div>
                    </div>
                </div>

                <div className="modal-close is-large" onClick={() => this.hide()}>

                </div>
            </div>
        )
    }
}