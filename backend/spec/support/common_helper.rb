# frozen_string_literal: true

module CommonHelper
  def expect_error(error)
    expect(json['errors']['message'].include?(error)).to be_truthy
  end
end

RSpec.configure do |config|
  config.include CommonHelper
end
