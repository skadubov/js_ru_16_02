import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { i18n } from '../i18n'
import { articlesStore, usersStore } from '../stores'
import ArticleList from './ArticleList'
import { loadAllArticles, createNewArticle } from './../actions/articles'
import { login, logout } from '../actions/user'

class Container extends Component {
    state = {
        articles: articlesStore.getOrLoadAll(),
        loading: articlesStore.loading,
        currentUser: usersStore.currentUser,
        lang: 'ru',
		msg: i18n['ru']
    }

    componentDidMount() {
        articlesStore.addChangeListener(this.change)
        usersStore.addChangeListener(this.changeUser)
    }

    componentWillUnmount() {
        articlesStore.removeChangeListener(this.change)
        usersStore.removeChangeListener(this.changeUser)
    }

    static childContextTypes = {
        user: PropTypes.string,
        msg: PropTypes.object
    }

    getChildContext() {
        return {
            user: this.state.currentUser,
			msg: this.state.msg
        }
    }

    render() {
        if (this.state.loading) return <h3>{this.state.msg.loading}</h3>
        return (
            <div>
				{this.getAuth()}
	            {this.getLangLine()}
                {this.getMenu()}
                {this.props.children}
            </div>
        )
    }

    toggleAuth = (ev) => {
        ev.preventDefault()
		const {currentUser} = this.state
		currentUser ? logout() : login()
    }

    getAuth() {
		const {currentUser} = this.state
        const username = currentUser ? <span className="username">{currentUser} </span> : null
        const msgAuth = currentUser ? this.state.msg.logout : this.state.msg.login

        return (
			<div>
				{username}
	            <a href="javascript:void(0)" onClick={this.toggleAuth}>{msgAuth}</a>
			</div>
        )
    }

    getLangLine() {
	    const langs = Object.keys(i18n).map(key =>
            <li key={key}>
	            <a href="javascript:void(0)" onClick={this.handleChangeLang.bind(this, key)}>{key}</a>
            </li>
        )
        return (
			<div>
				{this.state.msg.langChoice}:
				<ul className="lang">{langs}</ul>
			</div>
        )
    }

    getMenu() {
        const links = this.state.articles.map((article) =>
            <li key={article.id}>
                <Link to={`/articles/${article.id}`} activeClassName = "active" activeStyle = {{color: 'red'}} >
                    {article.title}
                </Link>
            </li>)
        return (
			<div>
    	        <ul>{links}</ul>
	            <a href="javascript:void(0)" onClick={this.handleNewClick}>{this.state.msg.createNewArticle}</a>
	        </div>
        )
    }

    handleChangeLang = (key) => {
        this.setState({
	        lang: key,
			msg: i18n[key]
        })
    }

    handleNewClick = (ev) => {
        ev.preventDefault()
        createNewArticle()
    }

    changeUser = () => {
        this.setState({
            currentUser: usersStore.currentUser
        })
    }

    change = () => {
        this.setState({
            loading: articlesStore.loading,
            articles: articlesStore.getAll()
        })
    };
}

export default Container
