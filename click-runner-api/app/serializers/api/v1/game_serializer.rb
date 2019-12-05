class Api::V1::GameSerializer
  include FastJsonapi::ObjectSerializer
  attributes :user, :user_id, :score, :score_modifier, :obstacle_modifier, :lives_modifier, :jump_height_modifier, :jump_num_modifier
end
