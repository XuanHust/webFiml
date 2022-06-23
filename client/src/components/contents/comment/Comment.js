import "./Comment.scss"

const Comment = (props) => {
    return(
        <div className="comment-container">
            <div className="comment">
                <div className="comment-left">
                    <p className="comment-top"></p>
                    <p className="comment-bottom">{props.user}</p>
                </div>
                <div className="comment-right">
                    {props.content}
                </div>
            </div>
        </div>
    )
}

export default Comment;