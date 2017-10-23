class RemoveColumnsFromEvents < ActiveRecord::Migration[5.1]
  def change
    remove_column :events, :speaker_multiple, :boolean
    remove_column :events, :host_multiple, :boolean
  end
end
