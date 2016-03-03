import AppDispatcher from '../dispatcher'
import { ADD_COMMENT, DELETE_COMMENT } from './constants'

export function addComment(comment) {
    AppDispatcher.dispatch({
        type: ADD_COMMENT,
        data: { ...comment }
    })
}

export function deleteComment(article_id, comment_id) {
    AppDispatcher.dispatch({
        type: DELETE_COMMENT,
        data: { article_id, comment_id }
    })
}
