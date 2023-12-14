export default () => ({
  port: parseInt(process.env.PORT, 10) || 8080,
  uri: process.env.DATABASE_URI
});