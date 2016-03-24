import React, { Component, PropTypes } from 'react'
import CommentList from './CommentList'
import { deleteArticle } from './../actions/articles'
require('./../style.css')

class Article extends Component {
    static propTypes = {
        article: PropTypes.object,
        addComment: PropTypes.func,
        deleteArticle: PropTypes.func,

        isOpen: PropTypes.bool,
        toggleOpen: PropTypes.func
    };

    render() {
        return (
            <div>
                {this.getTitle()}
                {this.getBody()}
            </div>
        )
    }

    getTitle() {
        const { onClick, article: { title } } = this.props
        return  (
            <h3 className="art_head" onClick={onClick}>
                {title}
            </h3>
        )
    }

    getBody() {
        const {article, addComment, isOpen} = this.props
        if (!isOpen) return null
        return (
            <div key="article">
                <a href="javascript:void(0)" onClick = {this.handleDeleteArticle}>delete this article</a>
                <p>{article.text}</p>
                <CommentList {...{ addComment, article }}/>
            </div>
        )
    }

    handleDeleteArticle = (ev) => {
        ev.preventDefault()
        this.props.deleteArticle(this.props.article.id)
    };
}

export default Article
