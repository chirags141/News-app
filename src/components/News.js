import { Component } from "react";
import React from "react";
import { NewsItem } from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


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

     capitalizeFirstLetter = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props){
        super(props);
        // console.log("Constructer of News")
        this.state = {
            articles: [],
            loading : false,
            page:1,
            totalResults : 0
        }

        document.title = `${this.capitalizeFirstLetter(this.props.category)} - Reliable News`;
    }

    async updateNews(pageNo){
      this.props.setProgress(10);
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      this.setState({loading : true })
      let data = await fetch(url);
      this.props.setProgress(50)
      let parsedData =await data.json()
      this.props.setProgress(70)
    //  console.log(parsedData)
      this.setState({
       articles:parsedData.articles,
       totalResults : parsedData.totalResults,
       loading : false
      }) 
      this.props.setProgress(100)
    }

   async componentDidMount(){
    await this.updateNews()
   }

  //  handlePrevClick = async ()=>{
  //   await this.setState({ page:this.state.page - 1 })
  //   await this.updateNews();

  //  }

  //  handleNextClick = async ()=>{
  //   await this.setState({ page:this.state.page + 1 })
  //   await this.updateNews();
  //  }

  fetchMoreData = async() => {
      this.setState({
        page : this.state.page +1 
      })
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      // this.setState({loading : true })
      let data = await fetch(url);
      let parsedData =await data.json()
     console.log(parsedData)
      this.setState({
       articles:this.state.articles.concat(parsedData.articles),
       totalResults : parsedData.totalResults,
       loading : false
      }) 
  };

  render() {
    return (
      <>
        <h2 style={{textAlign:"center"}}> Top Headlines - {this.capitalizeFirstLetter(this.props.category)}</h2>
       
        {this.state.loading && <Spinner />}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
        <div className="container">  
          <div className="row">
              {this.state.articles.map((element)=>{
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
        </div>

        </InfiniteScroll>

        {/* <div className="container d-flex justify-content-between">
          <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&laquo; Previous</button>
          <button disabled={this.state.page + 1 >Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &raquo;</button>
        </div> */}
      </>
    );  
  }
}
