export default () => ({
  port: parseInt(process.env.PORT, 10) || 8080,
  uri: process.env.MONGODB_URI
});