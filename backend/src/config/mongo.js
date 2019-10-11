const {
  MONGO_HOST: host,
  MONGO_PORT: port,
  MONGO_DB: db,
  // MONGO_USER: user,
  // MONGO_PASS: pass,
} = process.env;

// const url = `mongodb://${user}:${pass}@${host}:${port}/${db}?authSource=admin`;
const url = `mongodb://${host}:${port}/${db}?authSource=admin`;
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

export { url, options };
