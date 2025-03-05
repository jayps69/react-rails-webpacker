class ArticlesController < ApplicationController
  before_action :set_article, only: %i[show update destroy]

  def index
    @articles = Article.all
    respond_to do |format|
      format.html
      format.json { render json: @articles }
    end
  end

  def show
    respond_to do |format|
      format.html
      format.json { render json: @article }
    end
  end

  def create
    @article = Article.new(article_params)

    if @article.save
      render json: @article, status: :created
    else
      render json: { errors: @article.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @article.update(article_params)
      render json: @article, status: :ok
    else
      render json: { errors: @article.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    article = Article.find(params[:id])
    
    if article.destroy
      render json: { message: "Article deleted successfully" }, status: :ok
    else
      render json: { errors: article.errors.full_messages }, status: :unprocessable_entity
    end
  end
  
  private

  def set_article
    @article = Article.find(params[:id])
  end

  def article_params
    params.require(:article).permit(:title, :content)
  end
end
