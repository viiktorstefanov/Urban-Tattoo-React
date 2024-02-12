module.exports = () => (req, res, next ) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://urban-tattoo-react.web.app');
    res.setHeader('Access-Control-Allow-Methods', 'HEAD, OPTIONS, GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-type, Urban-Authorization, user');

    next();
}