import React from "react"

export default class extends React.Component {

    render() {
        return (
            <div className="column is-one-third" style={{marginBottom: 20}}>
                <div className="reme-image" style={{backgroundImage: `url("https://via.placeholder.com/400?text=Reme+by+Degreat`}}></div>
                <div className="level reme-action">
                    <div  style={{float: 'left'}}>
                        <i class="far fa-arrow-alt-circle-down has-text-link">&nbsp;</i><span className="has-text-grey">{parseInt((Math.random()*100))}</span>
                    </div>

                    <div style={{float: 'right'}}>
                        <a href="/" className="button"><i class="fas fa-arrow-down"></i>&nbsp;Download</a>
                    </div>
                </div>
            </div>
        )
    }
}