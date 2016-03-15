import SimpleStore from './SimpleStore'
import { LOAD_COMMENTS_FOR_ARTICLE, DELETE_ARTICLE, ADD_COMMENT, LOAD_ALL_ARTICLES, LOAD_ARTICLE_BY_ID, LOAD_ARTICLES_TITLES, GET_FILTERED_ARTICLES, _START, _FAIL, _SUCCESS } from '../actions/constants'
import AppDispatcher from '../dispatcher'
import { loadAllArticles, loadArticlesTitles } from '../actions/articles'

class ArticleStore extends SimpleStore {
    constructor(...args) {
        super(...args)
        this.dispatchToken = AppDispatcher.register((action) => {
            const { type, data, response, error } = action

            switch (type) {
                case DELETE_ARTICLE:
                    this.delete(data.id)
                    break;

                case ADD_COMMENT:
                    AppDispatcher.waitFor([this.__stores.comments.dispatchToken])
                    const article = this.getById(data.articleId)
                    article.comments = (article.comments || []).concat(data.id)
                    break

                case LOAD_ALL_ARTICLES + _START:
                    this.loading = true
                    this.loaded = false
                    break;

                case LOAD_ALL_ARTICLES + _FAIL:
                    this.loaded = false
                    this.loading = false
                    this.error = error
                    break

                case LOAD_ALL_ARTICLES + _SUCCESS:
                    this.loaded = true
                    this.loading = false
                    response.forEach(this.add)
                    break;

                case LOAD_ARTICLES_TITLES + _START:
                    this.loading = true
                    this.loaded = false
                    break;

                case LOAD_ARTICLES_TITLES + _FAIL:
                    this.loaded = false
                    this.loading = false
                    this.error = error
                    break

                case LOAD_ARTICLES_TITLES + _SUCCESS:
                    this.loaded = true
                    this.loading = false
                    response.forEach(this.add)
                    break;

				case GET_FILTERED_ARTICLES:
                    this.filtered = data.list
                    break;

                case LOAD_ARTICLE_BY_ID + _START:
                    this.getById(data.id).loading = true
                    break;

                case LOAD_ARTICLE_BY_ID + _SUCCESS:
                    this.add(response)
                    break;

                case LOAD_COMMENTS_FOR_ARTICLE + _SUCCESS:
                    AppDispatcher.waitFor([this.__stores.comments.dispatchToken])
                    break;

                default: return
            }

            this.emitChange()
        })
    }

    getOrLoadAll() {
        if (!this.loading && !this.loaded) loadAllArticles()
        return this.getAll()
    }

    getTitles() {
        if (!this.loading && !this.loaded) loadArticlesTitles()
        return this.getAll()
    }

	 getFiltered() {
	    if(this.filtered) {
	        return this.__items.filter(item => this.filtered.includes(item.id))
		} else {
			return this.__items
		}
    }
}

export default ArticleStore
