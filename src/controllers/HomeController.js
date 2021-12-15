export const HomeController = {
  welcome: (req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`<h1> Bem vindos</h1>`);
  },
};
