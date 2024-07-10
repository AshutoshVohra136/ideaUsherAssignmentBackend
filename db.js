mongoose
  .connect("mongodb://localhost:27017/testforSignInSignUP")
  .then(() => console.log(`Mongo Db Connected`))
  .catch((err) => console.log(`ERROR`, err));
