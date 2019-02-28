# mongoose

> [mongoosedoc](https://mongoosedoc.top/docs/guide.html)

## 链接 mongodb

```js
const mongoose = require('mongoose')

// 链连 test 数据库
mongoose.connect("mongodb://localhost:/test")

// 连接失败
mongoose.connection.on("disconnected", () => {}）

// 连接异常
mongoose.connection.on("error", () => {}）

// 连接成功
mongoose.connection.once("open", () => {}）
```

## Schemas

```js
// 引入Schema
const mongoose = required("mongoose");
const Schema = mongoose.Schema;

// 创建一个 Schema
const animalSchema = new Schema({ name: String, type: String });

// 创建一个 model
mongoose.model("Animal", animalSchema);
```

## 实例方法

`documents` 是 `Models` 的实例。 `Document` 有很多自带的实例方法， 当然也可以自定义我们自己的方法。

```js
// 自定义实例方法
animalSchema.methods.findSimilarTypes = fuction(){}

// 现在Animal的实例都有 findSimilarTypes 方法
const dog = new Amimal({ type: 'dog'})
dog.findSimilarTypes()
```

::: tip

- 重写 mongoose 的默认方法会造成无法预料的结果。
- 不要在自定义方法中使用 ES6 箭头函数，会造成 this 指向错误。
  :::

## 静态方法

```js
animalSchema.statics.findName = fuction(name, cb){
  return this.find({name: new RegExp(name, 'i')},cb)
}

const Animal = mongoose('Animal', animalSchema)

Animal.findByName('Tom', function(err, animals){
  console.log(animals)
})
```

::: tip

- 不要在静态方法中使用箭头函数
  :::
