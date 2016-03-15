import $ from 'jquery'

export function loadAll() {
    return $.get('/api/article')
}

export function loadArticlesTitles() {
    return $.get('/api/articles/title')
}

export function loadArticleById({ id }) {
    return $.get(`/api/article/${id}`)
}