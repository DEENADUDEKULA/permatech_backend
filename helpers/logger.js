const winston = require('winston');
const isObject = require('is-plain-object');

const { createLogger, format, transports } = winston

const { combine, timestamp,printf } = format
const rTracer = require('cls-rtracer')

const rTracerFormat = printf((info) => {
    const rid = rTracer.id()
    let message = deepRegexReplace(info.message) 
    let final_message = []
    for (var i = 0; i < message.length; i++) {
        const item = typeof message[i] == 'object'? JSON.stringify(message[i]):message[i]
        final_message.push(item)
    }
    final_message = final_message.join(' | ')
    return rid
    ? `${info.timestamp} [${info.level}] [request-id:${rid}]: ${final_message}`
    : `${info.timestamp} [${info.level}]: ${final_message}`
})

const deepRegexReplace = (value,single_key = '') => {

    try{
        const parsed_value = JSON.parse(value)
        if(typeof parsed_value == 'object'){
            value = parsed_value
        }
    }catch(e){}

    if (typeof value === 'undefined') return value || '';

    if (Array.isArray(value)) {
        for (let i = 0; i < value.length; i = i + 1) {
            value[i] = deepRegexReplace(value[i])
        }
        return value
    }else if(isObject(value)){
        for (let key in value) {
            if (value.hasOwnProperty(key)) {
                value[key] = deepRegexReplace(value[key],key)
            }
        }
        return value
    }else{
          return value
    }

}

const winstonLogger = createLogger({
    transports: [
        new transports.Console()
    ],
    level: 'debug',
    format: combine(
        timestamp(),
        rTracerFormat
    )
})


const wrapper = ( original ) => {
    return (...args) => {
        var _transformedArgs = []
        args.forEach((arg) => {
            if( typeof arg == "object" ){
                if( arg instanceof Error){
                    _transformedArgs.push(arg.stack)
                }else{ 
                    _transformedArgs.push(JSON.stringify(arg))
                }
            }else{
                _transformedArgs.push(arg)
            }
        })
        return original(_transformedArgs)
    }
}

winstonLogger.error = wrapper(winstonLogger.error)
winstonLogger.warn = wrapper(winstonLogger.warn)
winstonLogger.info = wrapper(winstonLogger.info)
winstonLogger.verbose = wrapper(winstonLogger.verbose)
winstonLogger.debug = wrapper(winstonLogger.debug)
winstonLogger.silly = wrapper(winstonLogger.silly)

var PermatechLogger = {
    log: function(level, message, ...args) {
      winstonLogger.log(level, message, ...args)  
    },
    error: function(message, ...args) {
        winstonLogger.error(message, ...args)
    },
    warn: function(message, ...args) {
        winstonLogger.warn(message, ...args)
    },
    info: function(message, ...args) {
        winstonLogger.info(message, ...args)
    },
    debug: function(message, ...args) {
        winstonLogger.debug(message, ...args)
    }
}

module.exports = PermatechLogger;
