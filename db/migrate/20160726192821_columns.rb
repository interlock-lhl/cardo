class Columns < ActiveRecord::Migration[5.0]
  def change
    create_table :columns do |t|
      t.string :name
      t.references :board
      t.integer :position, default: 0
      t.timestamps null: false
    end
  end
end
