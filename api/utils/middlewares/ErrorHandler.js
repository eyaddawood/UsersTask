const fs = require("fs").promises;

module.exports = async (res, err, source) => {
  console.error(`[${new Date()}]: ${err.message} | Api => ${source}`);

  // Log the error to a file for future reference
  const logFilePath = "./errorLog.txt";
  const errorMessage = `[${new Date()}]: ${err} | Api => ${source}\n`;

  try {
    await fs.appendFile(logFilePath, errorMessage);
  } catch (fileError) {
    console.error(`Error writing to log file: ${fileError.message}`);
  }

  if (source === "network") {
    let status = 500;
    let message = "Internal Server Error";

    switch (err.name) {
      case "SequelizeUniqueConstraintError":
        status = 409;
        message = "Network already exists";
        break;
      // Add more specific cases as needed
    }

    return res.status(status).json({
      error: {
        message: message,
        source: source,
        details: err.errors || [], // Include validation errors if available
      },
    });
  }

  res.status(500).json({
    error: {
      message: "Something went wrong.",
      source: source,
      details: err.errors || [], // Include validation errors if available
    },
  });
};
