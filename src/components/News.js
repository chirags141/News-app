import { Component } from "react";
import React from "react";
import { NewsItem } from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'


export class News extends Component {

    static defaultProps = {
      country: 'in',
      pageSize : 5,
      category : 'general'
    }

    static propTypes = {
      country : PropTypes.string,
      pageSize : PropTypes.number,
      category : PropTypes.string,
    }

    constructor(){
        super();
        // console.log("Constructer of News")
        this.state = {
            articles: [],
            loading : false,
            page:1
        }
    }

   async componentDidMount(){
     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2f9deb4187114baeaf5ef6c23c88e6e4&page=1&pageSize=${this.props.pageSize}`
     this.setState({loading : true })
     let data = await fetch(url);
     let parsedData =await data.json()
    //  console.log(parsedData)
     this.setState({
       articles:parsedData.articles,
       totalResults : parsedData.totalResults,
       loading : false
      })
   }

   handlePrevClick = async ()=>{
    //  console.log("prev")
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2f9deb4187114baeaf5ef6c23c88e6e4&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
    this.setState({loading : true })
    let data = await fetch(url);
    let parsedData =await data.json()
    // console.log(parsedData.articles)
    this.setState({
      page : this.state.page-1,
      articles : parsedData.articles,
      loading : false
    })
   }

   handleNextClick = async ()=>{
     if(!(this.state.page + 1 >Math.ceil(this.state.totalResults/this.props.pageSize))){

      //  console.log("next");
       let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2f9deb4187114baeaf5ef6c23c88e6e4&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
       this.setState({loading : true })
       let data = await fetch(url); 
       let parsedData =await data.json();
      //  console.log(parsedData.articles)
       this.setState({
         page : this.state.page+1,
         articles : parsedData.articles,
         loading : false
       })
     }
   }

  render() {
    return (
      <div className="container my-3">
        <h2 style={{textAlign:"center"}}> Top Headlines</h2>
        {this.state.loading && <Spinner />}
        <div className="row">
          {!this.state.loading && this.state.articles.map((element)=>{
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem 
                title={element.title} description={element.description} 
                imageUrl={element.urlToImage?element.urlToImage:"https://images.hindustantimes.com/img/2021/11/15/1600x900/Uttar_Pradesh_Purvanchal_Expressway_Narendra_Modi_1636988478195_1636988478374.jpg"}
                newsUrl={element.url}
                author = {element.author}
                date= {element.publishedAt}
                source = {element.source.name}>
                </NewsItem>
              </div>
            )
            })
          }
          
        </div>
        <div className="container d-flex justify-content-between">
          <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&laquo; Previous</button>
          <button disabled={this.state.page + 1 >Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &raquo;</button>
        </div>
      </div>
    ); 
  }
}
