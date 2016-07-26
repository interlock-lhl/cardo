class Api::ColumnsController < ApplicationController

  def index
    # render json: params
    @columns = Column.order("position ASC").where(board_id: params[:board_id]).all
    render json: @columns
  end

  def show
    @column = Column.find(params[:id])
    render json: @column
  end

  def create
    @column = Column.new(column_params)
    @column.board_id = params[:board_id]
    if @column.save
      render json: @column
    else
      render json: @column.errors
    end
  end

  def update
    @column = Column.find(params[:id])
    if @column.update_attributes(column_params)
      render json: @column
    else
      render json: @column.errors
    end
  end

  def destroy
    @column = Column.find(params[:id])
    if @column.destroy
      render json: @column
    else
      render json: @column.errors
    end
  end

  private

  def column_params
    params.require(:column).permit(:name, :position)
  end
end
