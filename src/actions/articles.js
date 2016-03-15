import AppDispatcher from '../dispatcher'
import { DELETE_ARTICLE, LOAD_ALL_ARTICLES, LOAD_ARTICLE_BY_ID, LOAD_ARTICLES_TITLES, GET_FILTERED_ARTICLES } from './constants'
import { loadAll, loadArticleById as loadById, loadArticlesTitles as loadTitles} from './api/article'
import { asyncAC } from './api/utils'

export function deleteArticle(id) {
    AppDispatcher.dispatch({
        type: DELETE_ARTICLE,
        data: { id }
    })
}

export function filteredArticles(list) {
    AppDispatcher.dispatch({
        type: GET_FILTERED_ARTICLES,
        data: { list }
    })
}

export const loadAllArticles = asyncAC(LOAD_ALL_ARTICLES, loadAll)
export const loadArticleById = asyncAC(LOAD_ARTICLE_BY_ID, loadById)
export const loadArticlesTitles = asyncAC(LOAD_ARTICLES_TITLES, loadTitles)
