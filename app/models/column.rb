class Column < ApplicationRecord
  belongs_to :board
  has_many :cards

  validates :name, presence: true
end
