const HttpErrorCodes = {
  HTTP_OK: 200,
  HTTP_CREATED: 201,
  ERROR_BAD_REQUEST: 400,
  ERROR_UNAUTHORIZED: 401,
  ERROR_FORBIDDEN: 403,
  ERROR_NOT_FOUND: 404,
  ERROR_CONFLICT: 409,
  ERROR_SERVER_ERROR: 500, 
};

class DatabaseException extends Error {
  constructor(message: string) {
    super(message);
  }
}

class NotAuthorizedException extends Error {
  constructor(message: string) {
    super(message);
  }
}

class ElementNotFoundException extends Error {
  constructor(message: string) {
    super(message);
  }
}

class ElementInvalidException extends Error {
  constructor(message: string) {
    super(message);
  }
}

class InvalidCredentials extends Error {
  constructor(message: string) {
    super(message);
  }
}

class ElementAlreadyExists extends Error {
  constructor(message: string) {
    super(message);
  }
}

const evalException = (err: Error, res: any) => {
  if (err instanceof ElementInvalidException) {
    return res.status(HttpErrorCodes.ERROR_BAD_REQUEST).send(err.message);
  } else if (err instanceof InvalidCredentials) {
    return res.status(HttpErrorCodes.ERROR_UNAUTHORIZED).send(err.message);
  } else if (err instanceof NotAuthorizedException) {
    return res.status(HttpErrorCodes.ERROR_FORBIDDEN).send(err.message);
  } else if (err instanceof ElementNotFoundException) {
    return res.status(HttpErrorCodes.ERROR_NOT_FOUND).send(err.message);
  } else if (err instanceof ElementAlreadyExists) {
    return res.status(HttpErrorCodes.ERROR_CONFLICT).send(err.message);
  } else if (err instanceof DatabaseException) {
    return res.status(HttpErrorCodes.ERROR_SERVER_ERROR).send(err.message);
  } else {
    return res.status(HttpErrorCodes.ERROR_SERVER_ERROR).send(err.message);
  }
};

module.exports = {
  ElementInvalidException,
  ElementAlreadyExists,
  ElementNotFoundException,
  InvalidCredentials,
  NotAuthorizedException,
  DatabaseException,
  HttpErrorCodes,
  evalException,
};
