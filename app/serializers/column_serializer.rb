class ColumnSerializer < ActiveModel::Serializer
  attributes :id, :name, :board_id, :position
  has_many :cards
end
