async function carregarTarefas(){
    const resposta = await fetch('/tarefas')
    const lista = await resposta.json()

    let tarefasConcluidas = document.querySelector("#tarefas-resolvidas")

    let tarefasPendentes = document.querySelector("#tarefas-pendentes")

    tarefasPendentes.innerHTML = ''
    tarefasConcluidas.innerHTML = ''

    ativarDragDropGrupo('tarefas-pendentes')
    ativarDragDropGrupo('tarefas-resolvidas')

    for(let tarefa of lista){
       let paragrafo = document.createElement("p")
       
       paragrafo.textContent = tarefa.descricao;
        
         //icone editar
       let iconeEditar = document.createElement("i");
        iconeEditar.className = "fas fa-pencil-alt btn-editar";
        iconeEditar.title = "Editar";
        iconeEditar.style.marginLeft = "10px";
        iconeEditar.style.cursor = "pointer";
        iconeEditar.onclick = (e) => {
            e.stopPropagation(); //impede que o clique no ícone dispare o clique no parágrafo pai
            editarTarefas(tarefa.descricao);
        };


        paragrafo.appendChild(iconeEditar);
       
        paragrafo.onclick = () => mudarStatus(tarefa.descricao)
          
           //icone excluir
          let iconeExcluir = document.createElement("i");
            iconeExcluir.className = "fas fa-trash btn-excluir";
            iconeExcluir.title = "Excluir";
            iconeExcluir.style.marginLeft = "10px";
            iconeExcluir.style.cursor = "pointer";
            iconeExcluir.onclick = (e) => {
                e.stopPropagation(); //impede que o clique no ícone dispare o clique no parágrafo pai
                if (confirm("Deseja excluir esta tarefa?")) {
            deletarTarefa(tarefa.descricao);
        }
    };
        paragrafo.appendChild(iconeExcluir)


        paragrafo.draggable = true
        paragrafo.dataset.id = tarefa.id
        paragrafo.ondragstart = (e) => {
            e.dataTransfer.setData('id', tarefa.id)
        }

       if(tarefa.resolvida == false){
        tarefasPendentes.appendChild(paragrafo)
       }else{
        paragrafo.style.textDecoration = "line-through"
        tarefasConcluidas.appendChild(paragrafo)
       }

    }
}

async function adicionarTarefa() {
    let input = document.querySelector("#nova-tarefa")
    let nomeNovaTarefa = input.value.trim() //trim = deixar padrao o espaço caso o usuário clique sem querer

    if(nomeNovaTarefa === "")return // evitar que que adicione um campo vazio
   
    await fetch ('/inserir',
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({nomeNovaTarefa: nomeNovaTarefa})
        }
    )
    input.value = ''; //limpar input assim que adicionar uma tarefa
    carregarTarefas()
}

async function editarTarefas(nomeAntigo) {
    let nomeNovo = prompt("Edite sua nova tarefa: ")
    await fetch ('/editar', 
    {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({nomeAntigo, nomeNovo})
    }
    )
    carregarTarefas();
}

async function mudarStatus(nomeTarefa) {
    await fetch ('/status',
        {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({nomeTarefa})

        }
    )
    carregarTarefas();
    
}

async function deletarTarefa(nomeTarefa) {
    await fetch ('/deletar',
        {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({nomeTarefa})
        }
    )
    carregarTarefas();
    
}

async function atualizarOrdem(div) {
    let ids = Array.from(div.children).map(el => el.dataset.id)
    await fetch('/mudarordem', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ ids })
    })
    
}

function ativarDragDropGrupo(idDiv) {
    const div = document.getElementById(idDiv)

    div.ondragover = (e) => {
        e.preventDefault()
    }

    div.ondrop = async (e) => {
        e.preventDefault()
        const id = e.dataTransfer.getData('id')
        const el = document.querySelector("[data-id='" +  id + "']")
        div.appendChild(el)
        await atualizarOrdem(div)
    }
}

//tema claro e escuro
const chk = document.querySelector('#chk')
chk.addEventListener('change',() =>{
    document.body.classList.toggle('dark')
})
//aqui serve para adicionar a tarefa com a tecla enter 
document.querySelector("#nova-tarefa").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        adicionarTarefa();
    }
});


