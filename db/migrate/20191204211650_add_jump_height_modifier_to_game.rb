class AddJumpHeightModifierToGame < ActiveRecord::Migration[6.0]
  def change
    add_column :games, :jump_height_modifier, :float, default: 0.0
  end
end
