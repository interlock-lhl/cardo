class Board < ApplicationRecord
  has_many :columns

  validates :name, presence: true
end
