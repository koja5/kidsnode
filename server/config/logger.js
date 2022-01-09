const { createLogger, format, winston, transports } = require("winston");
const CustomTransport = require("./customTransport");
const moment = require("moment");

console.log(process.env.NODE_ENV);

let logger = createLogger({});

if (process.env.NODE_ENV !== "production") {
  console.log("usao sam!");
  logger.add(
    new transports.Console({
      format: format.simple(),
    })
  );
} else {
  logger = createLogger({
    format: format.json(),
    transports: [
      new CustomTransport({
        filename: "error.log",
        level: "error",
        prettyPrint: JSON.stringify,
        format: format.combine(format.timestamp(), format.json()),
        handleExceptions: true,
      }),
      new CustomTransport({
        filename: "info.log",
        level: "info",
        prettyPrint: JSON.stringify,
        format: format.combine(format.timestamp(), format.json()),
        handleExceptions: true,
      }),
      new CustomTransport({
        filename: "warn.log",
        level: "warn",
        prettyPrint: JSON.stringify,
        format: format.combine(format.timestamp(), format.json()),
        handleExceptions: true,
      }),
    ],
  });
}

module.exports = logger;
