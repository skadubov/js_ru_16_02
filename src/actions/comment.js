import AppDispatcher from '../dispatcher'
import { ADD_COMMENT, LOAD_COMMENTS_FOR_ARTICLE, LOAD_COMMENTS_PAGE } from './constants'
import { loadForArticle, loadPage } from './api/comment'
import { asyncAC } from './api/utils'

export function addComment(text, articleId) {
    AppDispatcher.dispatch({
        type: ADD_COMMENT,
        data: {
            text,
            id: Date.now(),
            articleId
        }
    })
}

export const loadCommentsForArticle = asyncAC(LOAD_COMMENTS_FOR_ARTICLE, loadForArticle)
export const loadCommentsPage = asyncAC(LOAD_COMMENTS_PAGE, loadPage)
