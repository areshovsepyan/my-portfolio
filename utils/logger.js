import axios from 'axios';
import winston from 'winston';
import Transport from 'winston-transport';

class GistTransport extends Transport {
  constructor(opts) {
    super(opts);
    this.GITHUB_API_URL = opts.GITHUB_API + opts.LOGS_ID;
    this.GITHUB_REQ_CONFIG = {
      headers: {
        Authorization: `token ${opts.GIST_TOKEN}`,
        Accept: 'application/vnd.github.v3+json',
      },
    };
  }

  async log(info, callback) {
    // setImmediate(() => this.emit('logged', info));
    console.log('BEFORE AXIOS REQUEST ->');

    // Log while the request is pending
    setTimeout(() => {
      console.log('WHILE AXIOS IS PENDING ->');
    }, 0);

    try {
      console.log('SENDING AXIOS REQUEST...');

      const { data } = await axios.get(this.GITHUB_API_URL, this.GITHUB_REQ_CONFIG);
      console.log('AFTER AXIOS RESPONSE ->', data);

      const logs = JSON.parse(data.files['logs.json'].content) || [];

      logs.push({
        timestamp: new Date().toISOString(),
        level: info.level,
        message: info.logMessage,
      });

      console.log('UPDATING LOGS IN GIST...');

      await axios.patch(
        this.GITHUB_API_URL,
        { files: { 'logs.json': { content: JSON.stringify(logs, null, 2) } } },
        this.GITHUB_REQ_CONFIG,
      );

      console.log('✅ LOGS UPDATED SUCCESSFULLY');

      callback();
    } catch (error) {
      console.error('❌ Error updating logs in Gist:', error.message);
      callback(error);
    }
    // Prevent early process exit (only for debugging)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    process.on('exit', () => console.log('⚠️ PROCESS EXITING!'));
  }
}

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    // new GistTransport({
    //   LOGS_ID: process.env.GITHUB_LOGS_ID,
    //   GITHUB_API: process.env.GITHUB_API,
    //   GIST_TOKEN: process.env.GITHUB_GIST_TOKEN,
    // }),
  ],
});

export default logger;
