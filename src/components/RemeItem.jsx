import React from "react"

export default class extends React.Component {

    render() {
        let {reme} = this.props

        return (
            <div className="column is-one-third" style={{marginBottom: 20}} onClick={()=>this.props.onSelect()}>
                <div className="reme-image" style={{backgroundImage: `url("${reme.media}`}}></div>
                <div className="reme-action">
                    <div  style={{float: 'left'}}>
                        <i className="far fa-arrow-alt-circle-down has-text-link">&nbsp;</i><span className="has-text-grey">{reme.downloads}</span>
                    </div>

                    <div style={{float: 'right'}}>
                        <a href="/" className="button"><i className="fas fa-arrow-down"></i>&nbsp;Download</a>
                    </div>
                </div>
            </div>
        )
    }
}