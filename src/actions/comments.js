import AppDispatcher from '../dispatcher'
import { ADD_COMMENT, DELETE_COMMENT } from './constants'

export function addComment(article_id, comment_text) {
    AppDispatcher.dispatch({
        type: ADD_COMMENT,
        data: { article_id, comment: {text: comment_text, id: +new Date() } }
    })
}

export function deleteComment(article_id, comment_id) {
    AppDispatcher.dispatch({
        type: DELETE_COMMENT,
        data: { article_id, comment_id }
    })
}
