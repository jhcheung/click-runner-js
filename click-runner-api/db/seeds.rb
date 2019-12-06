# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
Game.destroy_all

user1 = User.create(name: "t3hmangafr34k")
user2 = User.create(name: "RevolutionDamnation")
user3 = User.create(name: "XxRedDarknessxX")
user4 = User.create(name: "13dAySoFeViL")
user5 = User.create(name: "BarryO")
user6 = User.create(name: "A-ROD")
user7 = User.create(name: "B-ROD")
user8 = User.create(name: "ProGamer")
user9 = User.create(name: "StevenUniverse")
user10 = User.create(name: "Garnet")




game1 = Game.create(user: user10, score: 222, score_modifier: 0.0, lives_modifier: 0.0, obstacle_modifier: 1.0, jump_num_modifier: 1.0, jump_height_modifier: 0.0)

game2 = Game.create(user: user1, score: 333, score_modifier: 5, lives_modifier: 20, obstacle_modifier: 30, jump_num_modifier: 15, jump_height_modifier: 11)
game3 = Game.create(user: user2, score: 444, score_modifier: 10, lives_modifier: 4, obstacle_modifier: 1, jump_num_modifier: 1, jump_height_modifier: 2)
game4 = Game.create(user: user3, score: 555, score_modifier: 20, lives_modifier: 23, obstacle_modifier: 34, jump_num_modifier: 88, jump_height_modifier: 22)
game5 = Game.create(user: user4, score: 666, score_modifier: 13, lives_modifier: 13, obstacle_modifier: 13, jump_num_modifier: 13, jump_height_modifier: 13)
game6 = Game.create(user: user5, score: 36, score_modifier: 4, lives_modifier: 30, obstacle_modifier: 33, jump_num_modifier: 12, jump_height_modifier: 8)
game7 = Game.create(user: user6, score: 409, score_modifier: 23, lives_modifier: 5, obstacle_modifier: 4, jump_num_modifier: 13, jump_height_modifier: 5)
game8 = Game.create(user: user7, score: 234, score_modifier: 15, lives_modifier: 40, obstacle_modifier: 12, jump_num_modifier: 6, jump_height_modifier: 10)
game9 = Game.create(user: user8, score: 1333, score_modifier: 99, lives_modifier: 0, obstacle_modifier: 0, jump_num_modifier: 0, jump_height_modifier: 0)
game10 = Game.create(user: user9, score: 234, score_modifier: 1, lives_modifier: 0, obstacle_modifier: 1, jump_num_modifier: 1, jump_height_modifier: 4)
