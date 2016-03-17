import $ from 'jquery'

export function loadForArticle({ articleId }) {
    return $.get(`/api/comment?article=${articleId}`)
}

export function loadPage({ page, limit }) {
    return $.get(`/api/comment?limit=${limit}&offset=${(page-1)*limit}`)
}
