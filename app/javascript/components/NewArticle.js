import React from "react";
import PropTypes from "prop-types";

class NewArticle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.article?.title || "",
      content: props.article?.content || "",
      errors: "",
      isEditMode: !!props.article, // Check if editing
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value, errors: "" });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { title, content, isEditMode } = this.state;
    const { article } = this.props;

    if (title.trim() === "" || content.trim() === "") {
      this.setState({ errors: "Title and content cannot be empty." });
      return;
    }

    try {
      const url = isEditMode ? `/articles/${article.id}` : "/articles";
      const method = isEditMode ? "PATCH" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": document.querySelector("meta[name='csrf-token']").getAttribute("content"),
        },
        body: JSON.stringify({ article: { title, content } }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.errors.join(", "));
      }

      alert(isEditMode ? "Article updated successfully!" : "Article created successfully!");
      window.location.href = "/"; // Redirect to home
    } catch (error) {
      this.setState({ errors: error.message });
    }
  };

  handleBack = () => {
    window.location.href = "http://localhost:3000";
  };

  render() {
    return (
      <React.Fragment>
        <h2>{this.state.isEditMode ? "Edit Article" : "Create New Article"}</h2>
        {this.state.errors && <p style={{ color: "red" }}>{this.state.errors}</p>}
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Title:</label>
            <input 
              type="text" 
              name="title" 
              value={this.state.title} 
              onChange={this.handleChange} 
            />
          </div>
          <div>
            <label>Content:</label>
            <textarea 
              name="content" 
              value={this.state.content} 
              onChange={this.handleChange} 
            />
          </div>
          <button type="submit">{this.state.isEditMode ? "Update" : "Submit"}</button>
        </form>
        <button onClick={this.handleBack} style={{ marginTop: "10px" }}>Back</button>
      </React.Fragment>
    );
  }
}

NewArticle.propTypes = {
  article: PropTypes.object, // Accept an article object for editing
};

export default NewArticle;
