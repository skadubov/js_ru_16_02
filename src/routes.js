import React from 'react'
import { Router, Route, Redirect, IndexRedirect, IndexRoute } from 'react-router'
import history from './history'
import Container from './components/Container'
import ArticlePage from './components/ArticlePage'
import NewArticlePage from './components/NewArticle'
import NotFound from './components/NotFound'
import ArticleIndexPage from './components/ArticleIndexPage'
import CommentsIndex from './components/CommentsIndex'
import CommentsPaginationPage from './components/CommentsPaginationPage'

export default (
    <Router history = {history} >
        <Route path="/articles" component = {Container}>
            {/*<IndexRedirect to="/articles/1" />*/}
            <IndexRoute component = {ArticleIndexPage}/>
            <Route path="/new" component = { NewArticlePage}
                onEnter = {(...args) => console.log('entering route', args)}
                onLeave = {(...args) => console.log('leaving route', args)}  />
            <Route path="/articles/:id" component = { ArticlePage } />
        </Route>
        <Route path="/comments" component = {CommentsIndex}>
            <Route path = ":page" component = {CommentsPaginationPage} />
        </Route>
        <Redirect from = "/:id" to="/articles/:id" />
        <Redirect from ='/' to='/articles'/>
        <Route path = "*" component = {NotFound} />
    </Router>
)