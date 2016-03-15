import React, { Component, PropTypes } from 'react'
import { articlesStore } from '../stores'
import { loadAllArticles, filteredArticles } from './../actions/articles'
import ArticleList from './ArticleList'
import Select from 'react-select';
import 'react-select/dist/react-select.css'

class Container extends Component {
    state = {
        titles: articlesStore.getTitles(),
   	    articles: articlesStore.getFiltered(),
   	    filteredId: []
    }

    componentDidMount() {
        articlesStore.addChangeListener(this.change)
    }

    componentWillUnmount() {
        articlesStore.removeChangeListener(this.change)
    }

    render() {
        const { articles, titles, loading } = this.state
        const options = titles.map(article => {
	       return {
              value: article.id,
              label: article.title
     	      }
           });
        if (loading) return <h3>Loading...</h3>
        return (
            <div id="example">
                <Select
                   multi
                   className="filter"
                   placeholder="Choice articles"
                   name="form-field-name"
                   value={this.state.filteredId}
                   options={options}
                   onChange={this.handleFilter.bind(this)}
                 />
                <ArticleList articles = {articles} />
            </div>
        )
    }

	handleFilter(val) {
		this.setState({
			filteredId : val.length ? val.split(',') : []
		})
		filteredArticles(val)
    }

    change = () => {
        this.setState({
            loading: articlesStore.loading,
	        titles: articlesStore.getTitles(),
	        articles: articlesStore.getFiltered()
        })
    };
}

export default Container
