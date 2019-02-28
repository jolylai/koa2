const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
const Mixed = Schema.Types.Mixed;

const SALT_WORK_FACTOR = 10;
const MAX_LOGIN_ATTEMPTS = 5;
const LOCK_TIME = 1 * 60 * 60 * 1000;

const UserSchema = new Schema({
  userName: {
    unique: true,
    type: String
  },
  email: {
    unique: true,
    type: String
  },
  password: {
    unique: true,
    type: String
  },
  lockUntil: Number,
  loginAttempts: {
    type: Number,
    required: true,
    default: 0
  },
  meta: {
    createdAt: {
      type: Date,
      default: Date.now()
    },
    updatedAt: {
      type: Date,
      default: Date.now()
    }
  }
});

UserSchema.pre("save", function(next) {
  // 密码是否被修改
  if (this.isModified("password")) return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(this.password, salt, (err, next) => {
      if (err) return next(err);
      this.password = hash;
      next();
    });
  });

  if (this.isNew) {
    this.meta.createdAt = this.meta.updatedAt = Date.now();
  } else {
    this.meta.updatedAt = Date.now();
  }
  next();
});

// 虚拟字段
// 不会存进数据库  么次都经过get 方法判断
UserSchema.virtual("isLocked").get(function() {
  return !!(this.lockUntil && lockUntil > Date.now());
});

// 实例方法
UserSchema.methods = {
  comparePassword: (_password, password) => {
    return new Promise((resolve, reject) => {
      bcrypt.compare(_password, password, (err, isMatch) => {
        if (err) {
          resolve(isMatch);
        } else {
          reject(err);
        }
      });
    });
  },
  incLoginAttepts: user => {
    return new Promise((resolve, reject) => {
      if (this.lockUntil && this.lockUntil < Date.now()) {
        this.update(
          {
            $set: {
              incLoginAttepts: 1
            },
            $unset: {
              lockUntil: 1
            }
          },
          err => {
            if (err) reject(err);
            else resolve();
          }
        );
      } else {
        let updates = {
          $inc: {
            loginAttempts: 1
          }
        };
        if (this.loginAttempts + 1 >= MAX_LOGIN_ATTEMPTS && !this.isLocked) {
          updates.$set = {
            lockUntil: Date.now() + LOCK_TIME
          };
        }
        this.update(updates, err => {
          if (err) reject(err);
          else resolve();
        });
      }
    });
  }
};

mongoose.model("User", UserSchema);
