
const proxy = require('http-proxy-middleware');
 
module.exports = function(app) {
  app.use(
    proxy('/api', {
      target: "http://localhost:8081",
        //target配置成'http://localhost:5000'意味着只要发现/api11前缀的请求，
        //就自动转发到'http://localhost:5000'这个地址，
        //并且通过配置pathRewrite: {'^/api11': ''}把添加了/api11的请求地址还原回去
      changeOrigin: true, 
        // 控制服务器收到的请求头中的Host的值 如果设置为true，服务器不会知道真实的请求地址，
        //只会知道代理的地址，如果设置为false，服务器会知道真正请求的地址
      pathRewrite: {'^/api': ''} 
        // 重写请求路径 这个必须要加，如果不加 服务器端收到的请求地址是 /api/url 请求地址就不对了
    }),
  )
}