class CreateGames < ActiveRecord::Migration[6.0]
  def change
    create_table :games do |t|
      t.references :user, null: false, foreign_key: true
      t.integer :score, default: 0
      t.float :lives_modifier, default: 0.0
      t.float :score_modifier, default: 0.0
      t.float :obstacle_modifier, default: 0.0

      t.timestamps
    end
  end
end
