import SimpleStore from './SimpleStore'
import { ADD_COMMENT, DELETE_COMMENT } from '../actions/constants'
import AppDispatcher from '../dispatcher'

class CommentStore extends SimpleStore {
    constructor(...args) {
        super(...args)
        this.dispatchToken = AppDispatcher.register((action) => {
            const { type, data } = action
            switch (type) {
                case ADD_COMMENT:
					console.log(ADD_COMMENT, data.comment);
                    this.add({id: data.comment.id, text: data.comment.text});
		            this.emitChange()
                    break;

                case DELETE_COMMENT:
					console.log(DELETE_COMMENT, data.comment_id);
                    this.delete(data.comment_id)
		            this.emitChange()
                    break;
            }
        })
    }
}

export default CommentStore
