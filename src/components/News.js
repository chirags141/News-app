import { Component } from "react";
import React from "react";
import { NewsItem } from "./NewsItem";

export class News extends Component {
  render() {
    return (
      <div className="container my-3">
        <h2>Sports Headlines</h2>
        <div className="row">
          <div className="col-md-4">
            <NewsItem title="Title1" description="myDescription" imageUrl=""></NewsItem>
          </div>
          <div className="col-md-4">
            <NewsItem title="Title2" description="myDescription" imageUrl=""></NewsItem>
          </div>
          <div className="col-md-4">
            <NewsItem title="Title3" description="myDescription" imageUrl=""></NewsItem>
          </div>
        </div>
      </div>
    );
  }
}
