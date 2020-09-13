const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(object);
  response.end();
};
const respondXML = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'text/xml' });
  response.write(object);
  response.end();
};

// success response
const success = (request, response, params, acceptedType) => {
  const responseJSON = {
    message: 'this is a successful response',
    id: 'success',
  };

  if (acceptedType[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
    responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
    responseXML = `${responseXML} </response>`;
    // xml success
    return respondXML(request, response, 200, responseXML);
  }
  // json success
  return respondJSON(request, response, 200, JSON.stringify(responseJSON));
};

// badRequest response
const badRequest = (request, response, params, acceptedType) => {
  const responseJSON = {
    message: 'This request has the required parameters',
    id: 'success',
  };

  if (acceptedType[0] === 'text/xml') {
    if (!params.valid || params.valid !== 'true') {
      responseJSON.message = 'Missing valid query parameter';
      responseJSON.id = 'badRequest';
      let responseXML = '<response>';
      responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
      responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
      responseXML = `${responseXML} </response>`;
      // if the LoggedIn parameter is set to true (XML)
      return respondXML(request, response, 400, responseXML);
    }

    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
    responseXML = `${responseXML} </response>`;
    // if the url does have valid parameter set to true
    return respondXML(request, response, 200, responseXML);
  }

  if (!params.valid || params.valid !== 'true') {
    responseJSON.message = 'Missing valid query parameter';
    responseJSON.id = 'badRequest';
    // if the url doesn't have valid parameter (JSON)
    return respondJSON(request, response, 400, JSON.stringify(responseJSON));
  }
  // if the url has valid parameter set to true(JSON)
  return respondJSON(request, response, 200, JSON.stringify(responseJSON));
};

// unauthorized response
const unauthorized = (request, response, params, acceptedType) => {
  const responseJSON = {
    message: 'Missing loggedIn query parameter set to yes',
    id: 'success',
  };

  if (acceptedType[0] === 'text/xml') {
    // if url doesn't have valid paramter
    if (!params.valid || params.valid !== 'yes') {
      responseJSON.message = 'Missing valid query parameter';
      responseJSON.id = 'unauthorized';
      let responseXML = '<response>';
      responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
      responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
      responseXML = `${responseXML} </response>`;
      return respondXML(request, response, 401, responseXML);
    }

    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
    responseXML = `${responseXML} </response>`;

    // if the url does have valid parameter set to true
    return respondXML(request, response, 200, responseXML);
  }

  // if the url doesn't have valid parameter (JSON)
  if (!params.loggedIn || params.loggedIn !== 'yes') {
    responseJSON.message = 'Missing valid query parameter';
    responseJSON.id = 'unauthorized';
    return respondJSON(request, response, 401, JSON.stringify(responseJSON));
  }
  // if the url has valid parameter set to true(JSON)

  return respondJSON(request, response, 200, JSON.stringify(responseJSON));
};

const forbidden = (request, response, params, acceptedType) => {
  const responseJSON = {
    message: 'You do not have access to this content',
    id: 'forbidden',
  };

  if (acceptedType[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
    responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
    responseXML = `${responseXML} </response>`;

    // xml
    return respondXML(request, response, 403, responseXML);
  }
  // json
  return respondJSON(request, response, 403, JSON.stringify(responseJSON));
};

const internalError = (request, response, params, acceptedType) => {
  const responseJSON = {
    message: 'Internal Server Error: Something went wrong',
    id: 'internalError',
  };

  if (acceptedType[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
    responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
    responseXML = `${responseXML} </response>`;
    // xml
    return respondXML(request, response, 500, responseXML);
  }
  // json
  return respondJSON(request, response, 500, JSON.stringify(responseJSON));
};

const notImplemented = (request, response, params, acceptedType) => {
  const responseJSON = {
    message: 'A get request for this page has not yet been implemented. Please try again later for updated content',
    id: 'notImplemented',
  };

  if (acceptedType[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
    responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
    responseXML = `${responseXML} </response>`;
    // xml
    return respondXML(request, response, 501, responseXML);
  }
  // json
  return respondJSON(request, response, 501, JSON.stringify(responseJSON));
};

const notFound = (request, response, acceptedType) => {
  const responseJSON = {
    message: 'The page you were looking for was not found',
    id: 'notFound',
  };
  if (acceptedType[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
    responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
    responseXML = `${responseXML} </response>`;
    // xml
    return respondXML(request, response, 404, responseXML);
  }
  // json
  return respondJSON(request, response, 404, JSON.stringify(responseJSON));
};

module.exports = {
  success,
  badRequest,
  notFound,
  unauthorized,
  forbidden,
  internalError,
  notImplemented,
};
