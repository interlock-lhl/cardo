class Cards < ActiveRecord::Migration[5.0]
  def change
    create_table :cards do |t|
      t.string :title
      t.string :description
      t.references :column
      t.integer :position, default: 0
      t.timestamps null: false
    end
  end
end
