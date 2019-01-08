import React from "react"
import { withRouter } from "react-router-dom"
import axios from "axios"
import ReactGA from "react-ga"
import RemeItem from "../components/RemeItem"
import RemeDetail from "../components/RemeDetail"

import reme from "../reme.png"
import sample from "../sample.jpg"

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showModal: false,
            fetching: false,
            popularRemes: [],
            recentRemes: [],
            searchResults: [],
            sort: 'popular', // or recent or search
        }

        this.popularRemesPage = 0
        this.recentRemesPage = 0
        this.currentReme = null
    }

    showDetail() {
        this.detailView.show(this.currentReme)
    }

    goBack() {
        this.props.history.goBack()
    }

    navigateToDetail(item) {
        this.currentReme = item
        this.props.history.push("/detail/")
    }

    navigateToUpload(event) {
        event.preventDefault()
        this.props.history.push("/upload/")
    }

    onRemeDownload(reme) {
        const endPoint = `https://reme.degreat.co.uk/api/download/${reme.id}/`

        axios.get(endPoint)
            .then(response => {

            })
            .then(error => {

            })

        ReactGA.initialize('UA-131943593-1')
        ReactGA.event({
            category: 'User',
            action: 'Download reme'
        })
    }

    fetchRemes(sort) {
        this.setState({ fetching: true })

        let page = sort === 'popular' ? this.popularRemesPage : this.recentRemesPage
        const endPoint = `https://reme.degreat.co.uk/api/${sort}/?page=${page}`

        axios.get(endPoint)
            .then(response => {
                const data = response.data

                if (sort === 'popular') {
                    if (data.length > 0) {
                        this.setState({
                            popularRemes: [...this.state.popularRemes, ...data]
                        })
                        this.popularRemesPage += 1
                    }

                    // TODO: indicate end of page
                } else if (sort === 'recent') {
                    if (data.length > 0) {
                        this.setState({
                            recentRemes: [...this.state.recentRemes, ...data]
                        })
                        this.recentRemesPage += 1
                    }

                }

                this.setState({ fetching: false })
            })
            .catch(error => {
                this.setState({ fetching: false })
            })

    }

    switchTo(e, to) {
        e.preventDefault()
        this.setState({ sort: to })
        this.fetchIfZero(to)
    }

    fetchIfZero(sort) {
        const _page = sort === 'popular' ? this.popularRemesPage : this.recentRemesPage
        if (_page === 0) {
            this.fetchRemes(sort)
        }
    }

    componentDidMount() {
        this.unlisten = this.props.history.listen((location) => {
            if (location.pathname !== "/detail/") {
                this.detailView.hide(false)
            }

            if (location.pathname === "/detail/") {
                // check if there is a current item, then show the modal, else
                // hide it
                if (this.currentReme !== null) {
                    this.showDetail()
                }
            }
        })

        this.fetchIfZero(this.state.sort)

        ReactGA.initialize('UA-131943593-1')
        ReactGA.pageview('/')
    }

    componentWillUnmount() {
        this.unlisten()
    }

    render() {
        const remes = this.state.sort === 'popular' ? this.state.popularRemes : this.state.recentRemes

        return (
            <div>
                <section className="section has-background-black">
                    <div className="container">
                        <img src={reme} alt="Reme by Degreat" width="80" />
                        <br /><br />
                        <div className="columns">
                            <div className="column">
                                <p className="title is-size-2 is-size-3-mobile has-text-white">Excite your fans<span role="img" aria-label="Rock n roll">🤟</span></p>
                                <p className="title is-size-2 has-text-white-ter">Add reactions to your funny <span role="img" aria-label="Funny">🤪</span> and dramatic <span role="img" aria-label="Dramatic">🤯</span> tweets.</p>
                                <p className="is-size-4 is-size-5-mobile has-text-grey-lighter">Find reaction memes by the kind of reaction or celebrity or movie name. Easily!</p>

                                <br />

                                <div style={{ display: 'inline-block' }}>
                                    <a href="/" className="button is-link" onClick={(e) => this.navigateToUpload(e)}><i className="fas fa-cloud-upload-alt"></i>&nbsp;Upload yours</a>
                                    <a href="/" className="button is-dark is-inverted is-outlined" style={{ marginLeft: 10 }}>About&nbsp;<strong>Reme by GR</strong></a>
                                </div>
                            </div>

                            <div className="column has-text-centered">
                                <img src={sample} alt="Sample Reme" style={{ maxHeight: 350, borderRadius: 8 }} />
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
                                        <input type="text" className="input is-rounded" placeholder="Search by kind of reaction, celebrity, movie or animal" />
                                        <span className="icon is-small is-left">
                                            <i className="fas fa-search"></i>
                                        </span>
                                    </p>
                                </div>
                            </div>

                            <div className="column">
                                <div className="tabs is-centered">
                                    <ul>
                                        <li className={this.state.sort === 'popular' ? "is-active" : ""}><a href="/" onClick={(e) => this.switchTo(e, 'popular')}>Popular</a></li>
                                        <li className={this.state.sort === 'recent' ? "is-active" : ""}><a href="/" onClick={(e) => this.switchTo(e, 'recent')}>Recently Uploaded</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="container" style={{ marginTop: 15 }}>
                        <div className="columns is-multiline">
                            {remes.map((item) => {
                                return <RemeItem reme={item}
                                    key={item.id}
                                    onSelect={() => this.navigateToDetail(item)}
                                    onDownload={(r) => this.onRemeDownload(r)} />
                            })}
                        </div>

                        <div className="has-text-centered" style={{ marginTop: 10 }}>
                            {this.state.fetching ? (
                                <button className="button is-loading">Fetching Remes...</button>
                            ) : (
                                    <button className="button has-text-centered" onClick={() => this.fetchRemes(this.state.sort)}>Fetch more remes</button>
                                )}
                        </div>
                    </div>
                </section>

                <RemeDetail onHide={() => this.goBack()}
                    ref={(node) => this.detailView = node}
                    onDownload={(r) => this.onRemeDownload(r)} />
            </div>
        )
    }
}

export default withRouter(Home)