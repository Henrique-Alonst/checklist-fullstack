# ✅ Checklist-Fullstack

Este é um projeto Full Stack desenvolvido com **Node.js**, **Express**, **MySQL**, **HTML**, **CSS** e **JavaScript**, com funcionalidades para criação, edição, exclusão e marcação de tarefas como concluídas. O projeto também inclui **tema claro/escuro** e suporte a **drag & drop** para reordenar tarefas!

## 💻 Funcionalidades

- Adicionar nova tarefa
- Editar tarefa existente
- Marcar tarefa como concluída ou pendente
- Excluir tarefas
- Reordenar tarefas com drag and drop
- Alternar entre tema claro e escuro
- Responsivo e intuitivo

## 📸 Prints do Projeto

> *(Adicione aqui as imagens do seu projeto — arraste para o README pelo GitHub ou use links externos)*

![Home-Dark](https://github.com/user-attachments/assets/12141fe6-187d-41ca-b8cc-cc72914b94b9)
![Home-Lighting](https://github.com/user-attachments/assets/349d2981-6777-4ea6-9354-3390f76a0b72)
![Responsivo-Dark](https://github.com/user-attachments/assets/d2e1c041-7541-4637-ba5d-b26fba6143f4)
![Responsivo-Lighting](https://github.com/user-attachments/assets/e3c1306d-231e-4030-ba88-dc1f426a336d)



## 🧠 Estrutura do Banco de Dados

O projeto utiliza um banco de dados MySQL com a seguinte estrutura principal:

- **Tabela:** `tarefas`
  - `id` (int, PK, AI)
  - `descricao` (varchar)
  - `resolvida` (boolean)
  - `ordem` (int)

O arquivo `.sql` para criação da tabela está incluso na pasta do projeto.

## 🛠️ Tecnologias utilizadas

- **Back-end:** Node.js, Express
- **Banco de dados:** MySQL
- **Front-end:** HTML, CSS, JavaScript
- **Outros:** FontAwesome, Fetch API

## 📁 Como executar o projeto

1. Clone o repositório:
   ```bash
   git clone https://github.com/Henrique-Alonst/checklist-fullstack.git
   cd checklist-fullstack

   npm install
   node server.js
   http://localhost:3000

Projeto desenvolvido por Henrique Alonso.

