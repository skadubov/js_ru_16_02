import React, { Component, PropTypes } from 'react'
import CommentList from './CommentList'
import { deleteArticle } from './actions/articles'
require('./style.css')

class Article extends Component {
    static propTypes = {
        article: PropTypes.object,

        isOpen: PropTypes.bool,
        toggleOpen: PropTypes.func
    };

    render() {
        return (
            <div>
                <a href = "#" onClick = {this.select.bind(this)} >select</a>
                {this.getTitle()}
                {this.getBody()}
            </div>
        )
    }

    getTitle() {
        const {onClick, selected, article: { title }} = this.props
        const selectedStyle = selected ? {color: 'red'} : null;
        return  (
            <h3 className="art_head" style = {selectedStyle} onClick={onClick}>
                {title}
            </h3>
        )
    }

    getBody() {
        if (!this.props.isOpen) return null
        const {article} = this.props
        return (
            <div key="article">
                <a href="#" onClick = {this.handleDeleteArticle}>delete this article</a>
                <p>{article.body}</p>
                <CommentList id={article.id} comments={article.getRelation('comments')} />
            </div>
        )
    }

    handleDeleteArticle = (ev) => {
        ev.preventDefault()
        deleteArticle(this.props.article.id)
    };

    select(ev) {
        ev.preventDefault()
        this.props.select()
    }
}

export default Article
