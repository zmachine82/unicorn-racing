# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2022_05_19_233139) do

  create_table "api_v1_bets", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "race_id", null: false
    t.integer "unicorn_id", null: false
    t.integer "amount"
    t.boolean "paid_out"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["race_id"], name: "index_api_v1_bets_on_race_id"
    t.index ["unicorn_id"], name: "index_api_v1_bets_on_unicorn_id"
    t.index ["user_id"], name: "index_api_v1_bets_on_user_id"
  end

  create_table "api_v1_race_results", force: :cascade do |t|
    t.integer "race_id", null: false
    t.integer "unicorn_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["race_id"], name: "index_api_v1_race_results_on_race_id"
    t.index ["unicorn_id"], name: "index_api_v1_race_results_on_unicorn_id"
  end

  create_table "api_v1_races", force: :cascade do |t|
    t.string "name"
    t.datetime "start_ts"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "api_v1_unicorns", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "roles", force: :cascade do |t|
    t.string "slug"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "tokens", force: :cascade do |t|
    t.integer "user_id", null: false
    t.string "value"
    t.datetime "expiry"
    t.string "ip"
    t.datetime "revocation_date"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_tokens_on_user_id"
  end

  create_table "user_roles", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "role_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["role_id"], name: "index_user_roles_on_role_id"
    t.index ["user_id"], name: "index_user_roles_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email"
    t.string "first_name"
    t.string "last_name"
    t.string "phone"
    t.string "password_digest"
    t.boolean "invitation_accepted", default: false
    t.string "invitation_token"
    t.datetime "invitation_expiration"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "balance", default: 0
    t.index ["email"], name: "index_users_on_email", unique: true
  end

  add_foreign_key "api_v1_bets", "api_v1_races", column: "race_id"
  add_foreign_key "api_v1_bets", "api_v1_unicorns", column: "unicorn_id"
  add_foreign_key "api_v1_bets", "users"
  add_foreign_key "api_v1_race_results", "api_v1_races", column: "race_id"
  add_foreign_key "api_v1_race_results", "api_v1_unicorns", column: "unicorn_id"
  add_foreign_key "tokens", "users"
  add_foreign_key "user_roles", "roles"
  add_foreign_key "user_roles", "users"
end
