import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions';
import { Link } from 'react-router-dom';


class PostsShow extends Component {
	componentDidMount() {
		const { id } = this.props.match.params;
		this.props.fetchPost(id);
	}

	onDeleteClick() {
		const { id } = this.props.match.params;

		
		this.props.deletePost(id, () => {
			this.props.history.push('/');
			//programmatic navigation after this completes send user back to Index
		});
	}

	
	render() {
		const { post } = this.props;

		if (!post) {
			return <div>Loading...</div>;
		}


		return (
			<div className="list-group">
				<Link to="/">Back to Index</Link>	
				<button
					className="btn btn-danger pull-xs-right"
					onClick={this.onDeleteClick.bind(this)}>
				Delete Post
				</button>			
				<h3 className="specific-post-title list-group-item">{post.title}</h3>
				<h6 className="list-group-item">Categories: {post.categories}</h6>
				<p className="list-group-item">{post.content}</p>
			</div>
		);
	}
}

function mapStateToProps( { posts }, ownProps) {
	return { post: posts[ownProps.match.params.id] };

}

export default connect (mapStateToProps, { fetchPost, deletePost }) (PostsShow);