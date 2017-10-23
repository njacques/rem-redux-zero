class RemoveColumnsFromEvents < ActiveRecord::Migration[5.1]
  def change
    remove_column :events, :speaker_muliple, :boolean
    remove_column :events, :host_muliple, :boolean
  end
end
