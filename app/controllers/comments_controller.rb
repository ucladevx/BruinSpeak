class CommentsController < ApplicationController
  before_action :authenticate_user!

  # TODO:
  #   * allow for nested comments
  #   * paginate after say 7-10 comments

  def create
    @comment_hash = params[:comment]
    @obj = @comment_hash[:commentable_type].constantize.find(@comment_hash[:commentable_id])
    # TODO: check to see whether the user has permission to create a comment on this object
    @comment = Comment.build_from(@obj, current_user.id, @comment_hash[:body])

    respond_to do |format|
      if @comment.save
        make_child_comment
        # TODO: make AJAX request instead of reloading page
        format.html { redirect_to(:back, notice: 'Comment was successfully added') }
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

  def make_child_comment
    comment_id = comment_params[:comment_id]
    return "" if comment_id.blank?

    parent_comment = Comment.find comment_id
    @comment.move_to_child_of(parent_comment)
  end
end
