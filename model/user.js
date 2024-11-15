const { Schema, model } = require("mongoose");
const { createHmac, randomBytes } = require("node:crypto");
const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    salt: {
      // for hasing the password
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    profileImageURL: {
      type: String,
      default: "/images/avatar.png",
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  { timestamps: true }
);
userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return;
  const salt = randomBytes(16).toString();
  const hashedPassword = createHmac('sha256', salt).update(user.password).digest("hex");
  this.salt = salt;
  this.password = hashedPassword;
  next();
});

userSchema.static('matchPassword', function(email, password)  {
    const user = this.findOne({email});
    if(!user) {
        return false;
    }
    const salt = user.salt;
    const hashedPassword = user.password;
    const userProvidedHash = createHmac('sha256', salt).update(password).digest('hex');
    return hashedPassword === userProvidedHash;
})

const USER = model("user", userSchema);
module.exports = USER;
