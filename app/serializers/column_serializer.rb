class ColumnSerializer < ActiveModel::Serializer
  attributes :id, :name, :position
  has_many :cards
end
