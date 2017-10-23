class Api::V1::EventsController < ApplicationController
  respond_to :json
  before_action :authenticate_request!, except: [:index]

  def index
    respond_with Event.all
  end

  def show
    respond_with Event.find(params[:id])
  end

  def create
    respond_with :api, :v1, Event.create(Event_params)
  end

  def destroy
    respond_with Event.destroy(params[:id])
  end

  def update
    event = Event.find(params["id"])
    event.update_attributes(event_params)
    respond_with Event, json: event
  end

  private

  def event_params
    params.require(:event).permit(
      :id,
      :event_type,
      :event_date,
      :title,
      :speaker,
      :host,
      :published
    )
  end
end
