import React from "react";
import PropTypes from "prop-types";

class ArticleList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      error: "",
    };
  }

  componentDidMount() {
    this.fetchArticles();
  }

  fetchArticles = async () => {
    try {
      const response = await fetch("/articles.json");
      const data = await response.json();

      if (!response.ok) {
        throw new Error("Failed to fetch articles.");
      }

      this.setState({ articles: data });
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  render() {
    return (
      <React.Fragment>
        <h2>Articles List</h2>
        {this.state.error && <p style={{ color: "red" }}>{this.state.error}</p>}

        <button onClick={() => (window.location.href = "/articles/new")}>
          Create New Article
        </button>

        <table border="1" style={{ width: "100%", marginTop: "10px" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Content</th>
            </tr>
          </thead>
          <tbody>
            {this.state.articles.length > 0 ? (
              this.state.articles.map((article) => (
                <tr key={article.id}>
                  <td>{article.id}</td>
                  <td>{article.title}</td>
                  <td>{article.content}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No articles found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

ArticleList.propTypes = {
  articles: PropTypes.array,
};

export default ArticleList;
