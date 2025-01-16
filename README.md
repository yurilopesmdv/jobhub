# JOBHUB

## Jobhub é um serviço web de cadastro de currículos e criação de vagas

### Descrição:

Nesta API foi criado todo o fluxo de cadastro, login, sessão, perfis, e vagas

## Endpoints:

## Cadastro e Login 

### **1. Cadastro de Usuário**
**`POST /signup`**

Registra um novo usuário no sistema.

#### **Validação do Corpo da Requisição (JSON):**
  ```json
  {
    "name": "string (obrigatório)",
    "birth_date": "date (opcional)",
    "email": "string (e-mail válido, obrigatório)",
    "password": "string (mínimo 3 caracteres, obrigatório)",
    "type": "string (obrigatório)"
  }

  POST /signup
  Content-Type: application/json

  {
    "name": "João Silva",
    "birth_date": "1990-01-01",
    "email": "joao.silva@example.com",
    "password": "123456",
    "type": "recruiter"
  }
  ```


### **2. Login de Usuário**
**`POST /signin`**

Autentica um usuário existente no sistema.

#### **Validação do Corpo da Requisição (JSON):**
```json
{
  "email": "string (e-mail válido, obrigatório)",
  "password": "string (obrigatório)"
}
```

#### A Resposta desse Endpoint retornará o TOKEN que deve ser utilizado nas demais API's



# Gerenciamento de Usuários e Perfil

## **Endpoints**

### **1. Listar Todos os Usuários**
**`GET /user/all`**

Retorna uma lista de usuários com paginação e filtro por tipo.

#### **Parâmetros de Query:**
```json
{
  "limit": "Número máximo de resultados por página (opcional, padrão: 10, máx: 100)",
  "page": "Número da página atual (opcional, padrão: 1)",
  "type": "Tipo de usuário, pode ser 'candidate' ou 'recruiter' (opcional, padrão: 'candidate')"
}
```

### **2. Buscar Usuário por ID**
**`GET /user/:id`**

Retorna os detalhes de um usuário específico.

#### **Parâmetros de Query:**
```json
{
  "id": "ID único do usuário (obrigatório)"
}
```

### **3. Criar Perfil de Usuário**
**`POST /user/profile`**

Cria um novo perfil de usuário com informações detalhadas.

#### **Corpo da Requisição (JSON):**
```json
{
  "title": "Título do perfil (obrigatório)",
  "about": "Sobre o usuário (obrigatório)",
  "description": "Descrição do perfil (obrigatório)",
  "experiences": "Array de experiências profissionais (obrigatório)",
  "courses": "Array de cursos feitos (obrigatório)",
  "skills": "Array de habilidades (obrigatório)"
}
```

### **4. Atualizar Perfil de Usuário**
**`PUT /user/profile`**

Atualiza um perfil de usuário existente.

#### **Corpo da Requisição (JSON):**
```json
{
  "title": "Título do perfil (opcional)",
  "about": "Sobre o usuário (opcional)",
  "description": "Descrição do perfil (opcional)",
  "experiences": "Array de experiências profissionais (opcional)",
  "courses": "Array de cursos feitos (opcional)",
  "skills": "Array de habilidades (opcional)"
}
```

### **5. Excluir Perfil de Usuário**
**`DELETE /user/profile`**

Exclui o perfil de um usuário existente.

#### **Parâmetros de Query:**
```json
{
  "id": "ID único do usuário (obrigatório)"
}
```


# Gerenciamento de Vagas

### **1. Listar Todas as Vagas**
**`GET /vacancies`**

Retorna uma lista de vagas com paginação e filtros opcionais por cidade, estado e país.

#### **Parâmetros de Query:**
```json
{
  "limit": "Número máximo de resultados por página (opcional, padrão: 10, máx: 100)",
  "page": "Número da página atual (opcional, padrão: 1)",
  "city": "Cidade para filtrar as vagas (opcional)",
  "state": "Estado para filtrar as vagas (opcional)",
  "country": "País para filtrar as vagas (opcional)"
}
```

### **2. Listar Uma Vaga**
**`GET /vacancy`**

Retorna os detalhes de uma vaga específica com base no ID fornecido.

#### **Parâmetros de Query:**
```json
{
  "id": "ID único da vaga (obrigatório)"
}
```

### **3. Criar uma Vaga**
**`POST /vacancy`**

Cria uma nova vaga com os dados fornecidos.

#### **Corpo da Requisição (JSON):**
```json
{
  "title": "Título da vaga (obrigatório)",
  "seniority": "Nível de senioridade da vaga (obrigatório, valores possíveis: 'Junior', 'Pleno', 'Senior', 'Especialista')",
  "description": "Descrição detalhada da vaga (obrigatório)",
  "company_name": "Nome da empresa (obrigatório)",
  "city": "Cidade onde a vaga está localizada (obrigatório)",
  "state": "Estado onde a vaga está localizada (obrigatório)",
  "country": "País onde a vaga está localizada (obrigatório)",
  "type": "Tipo da vaga (obrigatório, valores possíveis: 'Remoto', 'Hibrido', 'Presencial')"
}
```

### **4. Atualizar uma Vaga**
**`PUT /vacancy`**

Atualiza os dados de uma vaga existente com base no ID fornecido.

#### **Corpo da Requisição (JSON):**
```json
{
  "id": "ID único da vaga (obrigatório)",
  "title": "Título da vaga (opcional)",
  "seniority": "Nível de senioridade da vaga (opcional, valores possíveis: 'Junior', 'Pleno', 'Senior', 'Especialista')",
  "description": "Descrição detalhada da vaga (opcional)",
  "company_name": "Nome da empresa (opcional)",
  "city": "Cidade onde a vaga está localizada (opcional)",
  "state": "Estado onde a vaga está localizada (opcional)",
  "country": "País onde a vaga está localizada (opcional)",
  "type": "Tipo da vaga (opcional, valores possíveis: 'Remoto', 'Hibrido', 'Presencial')"
}
```

### **5. Deletar uma Vaga**
**`DELETE /vacancy`**

Exclui uma vaga existente com base no ID fornecido.

#### **Parâmetros de Query:**
```json
{
  "id": "ID único da vaga (obrigatório)"
}
```