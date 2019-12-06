# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
Game.destroy_all

user1 = User.create(name: "Jimmy")

game1 = Game.create(user: user1, score: 100, score_modifier: 0.5, lives_modifier: 0.6, obstacle_modifier: 0.7, jump_num_modifier: 1.0, jump_height_modifier: 2.2)

game2 = Game.create(user: user1, score: 200, score_modifier: 0.5, lives_modifier: 0.6, obstacle_modifier: 0.7, jump_num_modifier: 1.0, jump_height_modifier: 2.2)
game3 = Game.create(user: user1, score: 300, score_modifier: 0.5, lives_modifier: 0.6, obstacle_modifier: 0.7, jump_num_modifier: 1.0, jump_height_modifier: 2.2)