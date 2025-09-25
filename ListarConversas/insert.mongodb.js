const database = "test";
const collection = "messages";

// Seleciona o banco
use(database);

// 1️⃣ Listar todas as mensagens em ordem de envio (mais antigas primeiro)
// db[collection].find().sort({ data_hora: 1 })

// 2️⃣ Listar mensagens em ordem inversa (mais recentes primeiro)
// db[collection].find().sort({ data_hora: -1 })

// 3️⃣ Procurar mensagens por trecho (exemplo: "backend")
// db[collection].find({  mensagem: /guarda-chuva/i })
