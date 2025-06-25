module.exports = {
  apps: [
    {
      name: 'mynest',
      script: 'dist/main.js',
      instances: 'max', // or Number ( vCPU count ex:2 )
      exec_mode: 'cluster', // Activate cluster mode
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
