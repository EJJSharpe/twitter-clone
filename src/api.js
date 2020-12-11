import axios from 'axios'

const getTopics = async () => {
    const topics = await axios.get('https://elliots-news-app.herokuapp.com/api/topics');
    return topics.data.topics;

}

export const getArticles = async (topic, sort_by, order) => {
    const articles = await axios.get("https://elliots-news-app.herokuapp.com/api/articles", {
        params: { topic, sort_by, order }
    })
    console.log(articles.data.articles)
    return articles.data.articles;
};

export const getSingleArticle = async (article_id) => {
    const article = await axios.get(`https://elliots-news-app.herokuapp.com/api/articles/${article_id}`);
    return article.data.article;

}

export const getComments = async (article_id) => {
    const comments = await axios.get(`https://elliots-news-app.herokuapp.com/api/articles/${article_id}/comments`);
    return comments.data.comments;
}

export const postComment = async (article_id, content) => {
    const response = await axios.post(`https://elliots-news-app.herokuapp.com/api/articles/${article_id}/comments`, content)
    return response;
}

export const editVotes = async (comment_id, content) => {
    const response = await axios
        .patch(`https://elliots-news-app.herokuapp.com/api/comments/${comment_id}`, content)
    console.log(content)
    return response;
}

export const deleteComment = async (comment_id) => {
    const response = await axios.delete(`https://elliots-news-app.herokuapp.com/api/comments/${comment_id}`)
    return response;
}



export default getTopics