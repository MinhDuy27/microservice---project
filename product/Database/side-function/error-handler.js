const Sentry = require('@sentry/node')
const {ProfilingIntegration} = require('@sentry/profiling-node')
Sentry.init({
    dsn: 'https://ec9916017d9f417d880852d994edcdda@o4506046310252544.ingest.sentry.io/4506051438837760',
    integrations: [
      // enable HTTP calls tracing
      new Sentry.Integrations.Http({ tracing: true }),
      // enable Express.js middleware tracing
 
      new ProfilingIntegration(),
    ],
    // Performance Monitoring
    tracesSampleRate: 1.0,
    // Set sampling rate for profiling - this is relative to tracesSampleRate
    profilesSampleRate: 1.0,
  });
  module.exports = (app)=>{
    app.use((error,req,res,next)=>{
        Sentry.captureException(error);
        res.status(error.status || 500);
        res.json({
            error:{
                message: error.message
            }
        })
    });  

  }