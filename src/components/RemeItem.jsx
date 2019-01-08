import React from "react"

export default class extends React.Component {

    download() {
        this.props.onDownload(this.props.reme)
    }

    render() {
        let { reme } = this.props

        return (
            <div className="column is-one-third" style={{ marginBottom: 20 }}>
                <div className="reme-image" style={{ backgroundImage: `url("${reme.media}` }} onClick={() => this.props.onSelect()}></div>
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
                            onClick={(e) => this.download()}>
                            <i className="fas fa-arrow-down"></i>&nbsp;Download
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}