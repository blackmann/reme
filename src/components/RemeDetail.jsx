import React from "react"

const sampleTags = "laugh,hilarious,crazy,unknown,messi".split(",")

export default class extends React.Component {
    constructor(props) {
        super(props)
        this.state = {currentItem: null}
    }

    hide() {
        this.props.onHide()
    }

    replace(reme) {
        // first check if that is not the current one then push
        if (this.state.currentItem === reme) {
            return
        }

        this.setState({currentItem: reme})
    }

    render() {
        const modalClass = this.props.show ? "modal is-active" : "modal"

        return (
            <div className={modalClass}>
                <div className="modal-background" onClick={() => this.hide()}></div>
                <div className="modal-content">
                    <div className="box" style={{ paddingBottom: 50 }}>
                        <div className="has-text-centered">
                            <img src="https://via.placeholder.com/900x500" alt="" style={{ borderRadius: 8 }} />
                        </div>
                        <div className="reme-action is-clearfix">
                            <div style={{ float: 'left' }}>
                                <i className="far fa-arrow-alt-circle-down has-text-link">&nbsp;</i><span className="has-text-grey">{parseInt((Math.random() * 100))}</span>
                            </div>

                            <div style={{ float: 'right' }}>
                                <a href="/" className="button"><i className="fas fa-arrow-down"></i>&nbsp;Download</a>
                            </div>
                        </div>

                        <p className="title is-size-6">Keywords</p>
                        <div className="tags">
                            {sampleTags.map((item, index) => {
                                return <span className="tag is-medium is-link" key={index}>{item}</span>
                            })}
                        </div>

                        <div>
                            <p className="title is-size-6">Similar Remes</p>
                            <div className="columns is-multiline is-mobile">
                                {[1, 2, 3, 4, 5, 6].map((item, index) => {
                                    return (
                                        <div className="column is-half" key={index}>
                                            <div className="reme-image-small" style={{ backgroundImage: `url("https://via.placeholder.com/300")` }} onClick={() => this.replace(item)}></div>
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