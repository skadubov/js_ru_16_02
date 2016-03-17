import PageStore from './PageStore'
import { ADD_COMMENT, LOAD_COMMENTS_FOR_ARTICLE, LOAD_COMMENTS_PAGE, _SUCCESS, _FAIL, _START } from '../actions/constants'
import AppDispatcher from '../dispatcher'
import { loadCommentsPage } from '../actions/comment'
const COMMENT_PAGE_SIZE = 10

class CommentStore extends PageStore {
    constructor(...args) {
        super(...args)
        this.dispatchToken = AppDispatcher.register((action) => {
            const { type, data, response, error } = action

            switch (type) {
                case ADD_COMMENT:
                    this.add({
                        id: data.id,
                        text: data.text
                    })
                    break;

                case LOAD_COMMENTS_FOR_ARTICLE + _SUCCESS:
                    response.forEach(this.add)
                    break

                case LOAD_COMMENTS_PAGE + _SUCCESS:
                    this.setCurrentPage(data.page)
                    this.setTotalPages(Math.ceil(response.total/data.limit))
                    response.records.forEach(this.add)
                    break

                default: return
            }

            this.emitChange()
        })
    }

    getPage(page) {
        if(this.getCurrentPage() != page) {
			this.resetItems()
	        setTimeout(() => loadCommentsPage({page, limit: COMMENT_PAGE_SIZE}), 0)
		}
		return this.getAll()
    }
}

export default CommentStore
