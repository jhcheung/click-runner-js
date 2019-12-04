class AddJumpNumModifierToGame < ActiveRecord::Migration[6.0]
  def change
    add_column :games, :jump_num_modifier, :float
  end
end
