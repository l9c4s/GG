const fs = require('fs');
const BancoConexe = require("./Config/DBonfig");
const wppconnect = require('@wppconnect-team/wppconnect');

wppconnect
  .create({
    session: 'sessionName',
    catchQR: (base64Qr, asciiQR) => {
      console.log(asciiQR); // Optional to log the QR in the terminal
      var matches = base64Qr.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
        response = {};

      if (matches.length !== 3) {
        return new Error('Invalid input string');
      }
      response.type = matches[1];
      response.data = new Buffer.from(matches[2], 'base64');

      var imageBuffer = response;
      require('fs').writeFile(
        'out.png',
        imageBuffer['data'],
        'binary',
        function (err) {
          if (err != null) {
            console.log(err);
          }
        }
      );
    },
    logQR: false,
  })
  .then( async (client) => start(client))
  .catch((error) => console.log(error));


async function start(client) {
  
  client.onMessage((message) => {
    var From = message.from;
    //Recebendo Mensagem de grupo
    if(message.hasOwnProperty('author')){
        From = message.author;
    }

    BancoConexe
        .query(`CALL InsertMensagemWhats('${From.substring(0, From.indexOf('@'))}', '${message.body}')`)
        .then(v=> console.log(v))
        .catch(val=> console.log(`erro ${val}`));
        return;
  });
}


  async function  ListDadosConversas(client){

    client.listChats({ onlyUsers: true })
    .then((chats) => {
        // Faça o que for necessário com os chats
        console.log("USSER:" + chats);
    })
    .catch((error) => {
        // Trate qualquer erro ocorrido ao listar os chats
        console.error('Ocorreu um erro ao listar os chats:', error);
    });


    client.listChats({onlyGroups: true})
    .then((chats) => {
        // Faça o que for necessário com os chats
        console.log("Grupos:" + chats);
    })
    .catch((error) => {
        // Trate qualquer erro ocorrido ao listar os chats
        console.error('Ocorreu um erro ao listar os chats:', error);
    });

}