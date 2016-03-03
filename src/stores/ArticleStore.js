import SimpleStore from './SimpleStore'
import { DELETE_ARTICLE, ADD_COMMENT, DELETE_COMMENT } from '../actions/constants'
import AppDispatcher from '../dispatcher'

class ArticleStore extends SimpleStore {
    constructor(...args) {
        super(...args)
        this.dispatchToken = AppDispatcher.register((action) => {
            const { type, data } = action

            switch (type) {
                case DELETE_ARTICLE:
                    this.delete(data.id)
		            this.emitChange()
                    break;

	             case ADD_COMMENT:
                    AppDispatcher.waitFor([args[0].comments.dispatchToken]);
                    this.addCommentId(data.id, data.comment.id);
		            this.emitChange()
                    break;

	             case DELETE_COMMENT:
                    AppDispatcher.waitFor([args[0].comments.dispatchToken]);
                    this.deleteCommentId(data.article_id, data.comment_id);
		            this.emitChange()
                    break;
            }
        })
    }

	addCommentId = (id, comment_id) => {
        let article = this.getById(id);
        if(!article.comments) article.comments = []
        article.comments.push(comment_id)
    }

	deleteCommentId = (id, comment_id) => {
        let article = this.getById(id);
        if(!article.comments) return;
        article.comments = article.comments.filter( (value) => value != comment_id)
    }
}

export default ArticleStore
