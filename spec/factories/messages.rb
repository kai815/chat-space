FactoryGirl.define do

    factory :user do
       id         1
       name       "テスト"
       email      "test@test.com"
       password    "12345678"
       password_confirmation    "12345678"
    end

    factory :group do
       id         1
       name      "てすとグループ"
    end

    factory :message do
      body            "testtesttest"
      group_id        1
      user_id         1
      image {Rack::Test::UploadedFile.new(File.join(Rails.root, 'spec/fixtures/test.jpg'))}
      # image File.open("#{Rails.root}/spec/fixtures/test")
    end

end
