class CardSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :column_id, :position
end
