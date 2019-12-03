class CreateGames < ActiveRecord::Migration[6.0]
  def change
    create_table :games do |t|
      t.references :user, null: false, foreign_key: true
      t.integer :score
      t.float :lives_modifier
      t.float :score_modifier
      t.float :obstacle_modifier

      t.timestamps
    end
  end
end
