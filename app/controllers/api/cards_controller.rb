class Api::CardsController < ApplicationController

  def index
    # render json: params
    @cards = Card.order("position ASC").where(column_id: params[:column_id]).all
    render json: @cards
  end

  def show
    @card = Card.find(params[:id])
    render json: @card
  end

  def create
    @card = Card.new(card_params)
    @card.column_id = params[:column_id]
    if @card.save
      render json: @card
    else
      render json: @card.errors
    end
  end

  def update
    @card = Card.find(params[:id])
    if @card.update_attributes(card_params)
      render json: @card
    else
      render json: @card.errors
    end
  end

  def destroy
    @card = Card.find(params[:id])
    if @card.destroy
      render json: @card
    else
      render json: @card.errors
    end
  end

  private

  def card_params
    params.require(:card).permit(:title, :description, :position)
  end

end
