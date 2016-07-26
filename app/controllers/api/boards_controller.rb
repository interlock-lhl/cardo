class Api::BoardsController < ApplicationController

  def index
    @boards = Board.all
    render json: @boards
  end

  def show
    @board = Board.find(params[:id])
    render json: @board
  end

  def create
    @board = Board.new(board_params)
    if @board.save
      render json: @board
    else
      render json: @board.errors
    end
  end

  def update
    @board = Board.find(params[:id])
    if @board.update_attributes(board_params)
      render json: @board
    else
      render json: @board.errors
    end
  end

  def destroy
    @board = Board.find(params[:id])
    if @board.destroy
      render json: @board
    else
      render json: @board.errors
    end
  end

  private

  def board_params
    params.require(:board).permit(:name)
  end
end
