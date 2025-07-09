const express = require('express');
const  path = require('path');
const mysql = require('mysql2');


const app = express();  // tipo um web app que roda no meu servidor
const porta = 3000

// faz com que se faça acessar arquivos da pasta public
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json())

app.get('/',(req, res) =>{
        res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'dbtarefas'

    }
);

db.connect(err =>{
    if(err) throw err
    console.log("conectado ao MySQL.");
})

app.get('/tarefas',(req, res) =>{
    console.log("entrou na rota /tarefas")
        db.query('SELECT * FROM tarefas ORDER BY resolvida ASC, ordem ASC', (err, resultado) =>{
        if(err) throw err
        res.json(resultado)
       })
})         

app.post('/inserir', (req, res) =>{
    let nomeTarefa = req.body.nomeNovaTarefa 
        db.query('INSERT INTO tarefas (descricao, resolvida) VALUES (?, false)', [nomeTarefa], err =>{
        if (err) throw err
        res.sendStatus(200);  //await sempre tem que receber uma resposta 
    });
})

app.post('/editar', (req, res)=>{
    let nomeAntigo = req.body.nomeAntigo
    let nomeNovo = req.body.nomeNovo
 
        db.query('UPDATE tarefas SET descricao = ? WHERE descricao = ?', [nomeNovo, nomeAntigo], err =>{
        if(err) throw err
        res.sendStatus(200);
    })
})

app.post('/status', (req, res)=>{
    let nomeTarefa = req.body.nomeTarefa
        
        db.query('UPDATE tarefas SET resolvida = NOT resolvida WHERE descricao = ?', [nomeTarefa], err =>{
        if(err) throw err
        res.sendStatus(200);
    })
})

app.post('/deletar' ,(req, res)=>{
      let nomeTarefa = req.body.nomeTarefa
        db.query('DELETE FROM tarefas WHERE descricao = ?', [nomeTarefa], err =>{
        if(err) throw err
        res.sendStatus(200);
      })
})

app.post('/mudarordem', (req, res) => {
    const ids = req.body.ids

    ids.forEach((id, index) => {
        db.query(
            'UPDATE tarefas SET ordem = ? WHERE id = ?',
            [index, id],
            err => { if(err) console.error(err) }
        )
    })
    res.sendStatus(200)
})

app.listen(
    porta,
    () =>{
        console.log(`Servidor rodando em http://localhost:${porta}`);
    
});