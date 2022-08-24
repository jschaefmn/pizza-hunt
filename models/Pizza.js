const { Schema, model } = require('mongoose');

const PizzaSchema = new Schema(
  {
    pizzaName: {
      type: String
    },
    createdBy: {
      type: String
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    size: {
      type: String,
      default: 'Large'
    },
    toppings: [],
    comments: [
      {
        type: String,
        // this is just a placeholder, need to update to refer to Comment type
        // need to tell Mongoose to expect an ObjectId and tell it that its data comes from the Comment Model =>
        ref: 'Comment'
      }
    ]
  },
  {
    toJSON: {
      virtuals: true,
      // tells the schema to use virtuals
    },
    id: false
    // set id to false becuase this is a virtual that Mongoose returns and we don't need it
  }
);

// get total count of comments and replies on retrieval  
PizzaSchema.virtual('commentCount').get(function () {
  return this.comments.length
});

const Pizza = model('Pizza', PizzaSchema);
module.exports = Pizza;