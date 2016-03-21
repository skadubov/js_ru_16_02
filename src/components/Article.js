import React, { Component, PropTypes } from 'react'
import CommentList from './CommentList'
import { deleteArticle } from './../actions/articles'
require('./../style.css')

class Article extends Component {
    static propTypes = {
        article: PropTypes.object,

        isOpen: PropTypes.bool,
        toggleOpen: PropTypes.func
    };

   static contextTypes = {
        msg: PropTypes.object
    };

/*
    shouldComponentUpdate(nextProps, nextState) {
        console.log('---', arguments);
        return this.props.article != nextProps.article
    }
*/

    render() {
        return (
            <div>
                {this.getTitle()}
                {this.getBody()}
            </div>
        )
    }

    getTitle() {
console.log('----', this.props);
        const { onClick, selected, article: { title } } = this.props
        const selectedStyle = selected ? {color: 'red'} : null;
        return  (
            <h3 style = {selectedStyle} onClick={onClick}>
                {title}
            </h3>
        )
    }

    getBody() {
        const {article} = this.props
        if (article.loading) return <div key="article!"><h2>{this.context.msg.loading}</h2></div>
        return (
            <div key="article">
                <a href="#" onClick = {this.handleDeleteArticle}>{this.context.msg.deleteArticle}</a>
                <p>{article.text}</p>
                <CommentList article = {article}/>
            </div>
        )
    }

    handleDeleteArticle = (ev) => {
        ev.preventDefault()
        deleteArticle(this.props.article.id)
    };
}

export default Article