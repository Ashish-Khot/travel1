const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  country: { type: String, required: true },
  interests: { type: String, default: "" },
  role: {
    type: String,
    enum: ["tourist", "guide", "admin", "hotel", "hospital"],
    default: "tourist"
  },
  avatar: { type: String, default: "" },
  isVerified: { type: Boolean, default: false }
}, { timestamps: true });


// 🔐 FIXED bcrypt hook
UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model("User", UserSchema);
