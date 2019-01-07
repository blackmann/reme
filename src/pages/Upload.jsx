import React from "react"
import remeBlack from "../reme-black.png"

class Upload extends React.Component {

    constructor(props) {
        super(props)
        this.state = { tags: [], currentTagInput: "" }
    }

    addTag() {
        const _tag = this.state.currentTagInput.trim()
        if (_tag.length < 1) {
            return
        }

        // if its not in the tags already

        if (this.state.tags.indexOf(_tag) === -1) {
            this.setState({ tags: [...this.state.tags, _tag], currentTagInput: "" })
        }
    }

    removeTag(tag) {
        const _tags = this.state.tags
        _tags.splice(this.state.tags.indexOf(tag), 1)
        this.setState({tags: _tags})
    }

    render() {
        return (
            <section className="section">
                <div className="container">
                    <img src={remeBlack} alt="Reme by GR" width="80" />
                    <br /><br />
                    <p className="title is-size-5">Upload Reme</p>

                    <div className="columns">
                        <div className="column">
                            <div className="upload-box">
                                <p className="is-size-5">Click here to pick image</p>
                            </div>
                        </div>

                        <div className="column">
                            <p className="title is-size-6">Keywords</p>
                            <p className="has-text-grey">Provide keywords that will make finding this reme easier. You can use the name of the item, celebrity, action, dress, text, etc. found in the image.</p>

                            <p className="has-text-weight-bold">Add as many tags as you want</p>
                            <br/>
                            <div className="tags">
                                {this.state.tags.map((item, index) => {
                                    return (
                                        <span className="tag is-medium is-warning" key={index}>
                                            {item}
                                            <button className="delete is-small" onClick={() => this.removeTag(item)}></button>
                                        </span>
                                    )
                                })}
                            </div>

                            <div className="columns">
                                <div className="column is-three-quarters">
                                    <div className="control">
                                        <input type="text"
                                            value={this.state.currentTagInput}
                                            className="input"
                                            placeholder="Type a tag and press Enter key or Add Tag"
                                            onChange={(e) => this.setState({ currentTagInput: e.target.value })}
                                            onKeyPress={(event) => {
                                                if (event.key === "Enter") {
                                                    this.addTag()
                                                }
                                            }} />
                                    </div>
                                </div>

                                <div className="column">
                                    <button className="button" onClick={() => this.addTag()}>Add tag</button>
                                </div>
                            </div>

                            <button className="button is-link"><i className="fas fa-cloud-upload-alt"></i>&nbsp;Upload Reme</button>

                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default Upload