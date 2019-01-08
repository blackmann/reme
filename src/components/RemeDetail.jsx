import React from "react"
import axios from "axios"

export default class extends React.Component {
    constructor(props) {
        super(props)
        this.state = { currentItem: null, similar: [] }
    }

    // the notifyParent argument is used to control recursive
    // calls to props.onHide
    hide(notifyParent = true) {
        this.setState({ show: false, similar: [] })
        if (notifyParent) {
            this.props.onHide()
        }
    }

    show(reme) {
        this.setState({ show: true, currentItem: reme })
        this.fetchSimilar(reme)
    }

    replace(reme) {
        // first check if that is not the current one then push
        if (this.state.currentItem === reme) {
            return
        }

        this.setState({ currentItem: reme })
        this.fetchSimilar(reme)
    }

    fetchSimilar(reme) {
        const endPoint = `https://reme.degreat.co.uk/api/similar/${reme.id}`

        axios.get(endPoint)
            .then(response => {
                this.setState({similar: response.data})
            })
            .catch(error => {

            })
    }

    download(reme) {
        this.props.onDownload(reme)
    }

    render() {
        const modalClass = this.state.show ? "modal is-active" : "modal"
        const reme = this.state.currentItem

        if (reme === null) {
            return <div></div>
        }

        return (
            <div className={modalClass}>
                <div className="modal-background" onClick={() => this.hide()}></div>
                <div className="modal-content">
                    <div className="box" style={{ paddingBottom: 50 }}>
                        <div className="has-text-centered">
                            <img src={reme.media} alt="" style={{ borderRadius: 8 }} />
                        </div>
                        <div className="reme-action is-clearfix">
                            <div style={{ float: 'left' }}>
                                <i className="far fa-arrow-alt-circle-down has-text-link">&nbsp;</i><span className="has-text-grey">{reme.downloads}</span>
                            </div>

                            <div style={{ float: 'right' }}>
                                <a href={reme.media}
                                    download
                                    target="_blank"
                                    className="button"
                                    rel="noopener noreferrer"
                                    onClick={() => this.download(reme)}>
                                    <i className="fas fa-arrow-down"></i>&nbsp;Download
                                </a>
                            </div>
                        </div>

                        <p className="title is-size-6">Keywords</p>
                        <div className="tags">
                            {reme.tags.map((item, index) => {
                                return <span className="tag is-medium is-link" key={index}>{item}</span>
                            })}
                        </div>

                        <div>
                            <p className="title is-size-6">Similar Remes</p>
                            <div className="columns is-multiline is-mobile">
                                {this.state.similar.map((item) => {
                                    return (
                                        <div className="column is-half" key={item.id}>
                                            <div className="reme-image-small" style={{ backgroundImage: `url(${item.media})` }} onClick={() => this.replace(item)}></div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                </div>

                <button className="modal-close is-large" onClick={() => this.hide()}></button>
            </div>
        )
    }
}