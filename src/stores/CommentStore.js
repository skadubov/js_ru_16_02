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
                    this.add(data.comment);
		            this.emitChange()
                    break;

                case DELETE_COMMENT:
                    this.delete(data.comment_id)
		            this.emitChange()
                    break;
            }
        })
    }
}

export default CommentStore
