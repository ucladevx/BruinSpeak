class CommentsController < ApplicationController
  before_action :authenticate_user!

  # TODO:
  #   * paginate after say 7-10 comments

  def create
    commentable = commentable_type.constantize.find(commentable_id)
    @comment = Comment.build_from(commentable, current_user.id, body)
    @petition = Petition.find(@comment.commentable_id)
    @new_comment = Comment.build_from(@petition, current_user.id, "")
    @current_user = current_user
    respond_to do |format|
      if @comment.save
        make_child_comment
        # TODO: make AJAX request instead of reloading page
        format.html { redirect_to(:back, notice: 'Comment was successfully added') }
        format.js { render :template => "comments/comment"}
      else
        # TODO: If the comment fails to save, pop up a notification
        format.html { redirect_to(:back) }
      end
    end
  end

  def destroy
    @comment = Comment.find(params[:id])

    respond_to do |format|
      if @comment.destroy
        # TODO: make AJAX request instead of reloading page
        format.html { redirect_to(:back, notice: 'Comment was successfully deleted') }
      else
        # TODO: If the comment fails to delete, pop up a notification
        format.html { redirect_to(:back) }
      end
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:body, :commentable_id, :commentable_type, :comment_id)
  end

  def commentable_type
    comment_params[:commentable_type]
  end

  def commentable_id
    comment_params[:commentable_id]
  end

  def comment_id
    comment_params[:comment_id]
  end

  def body
    comment_params[:body]
  end

  def make_child_comment
    return "" if comment_id.blank?

    parent_comment = Comment.find comment_id
    @comment.move_to_child_of(parent_comment)
  end

end
