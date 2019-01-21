[Meal, User].each do |klass|
  klass.delete_all
end

User.create! name: "Manager User", email: "manager.user@gmail.com", password: "12345678", role: User.roles[:manager]
User.create! name: "Admin User", email: "admin.user@gmail.com", password: "12345678", role: User.roles[:admin]

