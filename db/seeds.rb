# EVENTS
# To get JSON into app:
# 1. Export https://igsn.herokuapp.com/calendar.js (`events.json`)
# 2. Tidy it up here: https://jsonlint.com/
# 3. Remove `events` property, so `{"events": [{ ... }]}` becomes `[{ ... }]}`
# 4. Create `./seeds/events.json`
# 5. Read `events.json` into this file
# 6. Sort by ID using `p json.sort_by { |json| json['id'].to_i }`
# 7. Do a search and replace to replace `=>` with `: `
# 8. Format again then copy formatted JSON into `events.json`
# 9. Do a search and replace to remove remove `id` property
# 10. Import it into app, then iterate over records and create entries in DB

# Links:
# - https://stackoverflow.com/questions/19636196/sort-in-ruby-a-json-array-of-hashes
# - https://gist.github.com/shvetsovdm/6317604

json = ActiveSupport::JSON.decode(File.read('db/seeds/events.json'))
json.each do |record|
  Event.create!(record)
end

# USERS
User.create!([
  { email: "jchibbard@gmail.com", password: "password", password_confirmation: 'password' },
  { email: "mr_nice66@yahoo.com", password: "drugs", password_confirmation: 'drugs' }
])
