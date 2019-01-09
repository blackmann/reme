import React from "react"
import { Link } from "react-router-dom"

import reme from "../reme.png"
import withBulma from "../made-with-bulma--dark.png"

export default class extends React.Component {

    render() {
        return (
            <footer className="footer has-background-black">
                <section className="section">
                    <div className="container">
                        <div className="columns">
                            <div className="column">
                            <p className="title is-size-6 is-uppercase has-text-grey">More</p>
                                <ul>
                                    <li><Link to="/upload/">Upload a Reme</Link></li>
                                    <li><a href="/">About</a></li>
                                    <li><a href="/">Feedback</a></li>
                                    <li><a href="/">Terms & Privacy</a></li>
                                </ul>
                            </div>

                            <div className="column space-up-mobile">
                                <img src={reme} alt="Reme by GR" width="150"/>
                                <p className="has-text-grey-light">Reme by GR<span role="img" aria-label="rock n roll">🤟</span></p>
                                <p className="has-text-grey-light">&copy; 2019 <a href="https://degreat.co.uk/" className="has-text-grey-light">De-Great Yartey</a></p>
                                <br/>
                                <a href="https://bulma.io/" target="_blank"><img src={withBulma} alt="Made with Bulma" width="150"/></a>
                            </div>
                        </div>
                    </div>
                </section>
            </footer>
        )
    }
}