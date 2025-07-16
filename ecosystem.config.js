module.exports = {
  apps: [
    {
      name: 'myapp',
      script: 'dist/main.js',
      instances: 'max', // or Number ( vCPU count ex:2 )
      exec_mode: 'cluster', // Activate cluster mode
      autorestart: true,
      watch: false
    },
  ],
};
