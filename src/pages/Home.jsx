import React from "react"
import RemeItem from "../components/RemeItem"

import reme from "../reme.png"
import sample from "../sample.jpg"
import RemeDetail from "../components/RemeDetail";

class Home extends React.Component {

    render() {
        return (
            <div>
                <section className="section has-background-black">
                    <div className="container">
                        <img src={reme} alt="Reme by Degreat" width="80" />
                        <br /><br />
                        <div className="columns">
                            <div className="column">
                                <p className="title is-size-2 is-size-3-mobile has-text-white">Excite your fans🤟</p>
                                <p className="title is-size-2 has-text-white-ter">Add reactions to your funny 🤪 and dramatic 🤯 tweets.</p>
                                <p className="is-size-4 is-size-5-mobile has-text-grey-lighter">Find reaction memes by the kind of reaction or celebrity or movie name. Easily!</p>

                                <br/>

                                <div style={{display: 'inline-block'}}>
                                    <a href="/" className="button is-link"><i class="fas fa-cloud-upload-alt"></i>&nbsp;Upload yours</a>
                                    <a href="/" className="button is-dark is-inverted is-outlined" style={{marginLeft: 10}}>About&nbsp;<strong>Reme by GR</strong></a>
                                </div>
                            </div>

                            <div className="column has-text-centered">
                                <img src={sample} alt="Sample Reme" style={{maxHeight: 350, borderRadius: 8}}/>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section">
                    <div className="container">
                        <div className="columns">
                            <div className="column is-three-quarters">
                                <div className="field">
                                    <p className="control has-icons-left">
                                        <input type="text" className="input is-rounded" placeholder="Search by kind of reaction, celebrity, movie or animal"/>
                                        <span className="icon is-small is-left">
                                            <i class="fas fa-search"></i>
                                        </span>
                                    </p>
                                </div>
                            </div>

                            <div className="column">
                                <div className="tabs is-centered">
                                    <ul>
                                        <li className="is-active"><a href="/">Popular</a></li>
                                        <li><a href="/">Recently Uploaded</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="container" style={{marginTop: 15}}>
                    <div className="columns is-multiline">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((item) => {
                            return <RemeItem key={item} onSelect={() => this.remeDetail.show(item)}/>
                        })}
                    </div>
                    </div>
                </section>

                <RemeDetail ref={(node) => this.remeDetail = node}/>
            </div>
        )
    }
}

export default Home