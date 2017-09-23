class CreateEvents < ActiveRecord::Migration[5.1]
  def change
    create_table :events do |t|
      t.string :event_type
      t.date :event_date
      t.text :title
      t.string :speaker
      t.boolean :speaker_multiple
      t.string :host
      t.boolean :host_multiple
      t.boolean :published

      t.timestamps
    end
  end
end
