# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


# https://stackoverflow.com/questions/19636196/sort-in-ruby-a-json-array-of-hashes
# json = ActiveSupport::JSON.decode(File.read('db/seeds/events.json'))
# p json.sort_by { |json| json['id'].to_i }

# https://gist.github.com/shvetsovdm/6317604
json = ActiveSupport::JSON.decode(File.read('db/seeds/events-sorted-normalized.json'))
json.each do |record|
  Event.create!(record)
end
