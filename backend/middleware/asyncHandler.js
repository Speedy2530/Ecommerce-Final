//custom asyncronous function handler

const asyncHandler = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
}
//function takes in (request resolve next), and if it resolves, it calls the next piece of middleware
//simplifies code by removing the need for a bunch of try/catch blocks

export default asyncHandler
