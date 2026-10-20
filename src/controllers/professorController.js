// Armazenamento em memória
let professores = [
  {
    id: 1,
    nome: "Emelly Souza Oliveira",
    idade: 28,
    departamento: "Tecnologia",
    turmas: [
      {
        codigo: "T01",
        disciplina: "Estrutura de Dados",
        alunos: ["Ana", "Carlos", "Beatriz"]
      }
    ]
  },
  {
    id: 2,
    nome: "Carlos Eduardo Silva",
    idade: 42,
    departamento: "Tecnologia",
    turmas: [
      {
        codigo: "T03",
        disciplina: "Programação Web",
        alunos: ["Daniel", "Fernanda"]
      }
    ]
  },
  {
    id: 3,
    nome: "Mariana Santos Rocha",
    idade: 35,
    departamento: "Matemática",
    turmas: [
      {
        codigo: "M01",
        disciplina: "Cálculo I",
        alunos: ["Gabriel", "Helena", "Igor"]
      }
    ]
  }
];

let proximoId = 4;

// GET /professores
export const listarProfessores = (req, res) => {
  return res.status(200).json(professores);
};

// GET /professores/:id
export const buscarProfessorPorId = (req, res) => {
  const id = Number(req.params.id);
  const professor = professores.find((p) => p.id === id);

  if (!professor) {
    return res.status(404).json({ mensagem: "Id não existente" });
  }

  return res.status(200).json(professor);
};

// GET /professores/:id/turmas
export const listarTurmasPorProfessor = (req, res) => {
  const id = Number(req.params.id);
  const professor = professores.find((p) => p.id === id);

  if (!professor) {
    return res.status(404).json({ mensagem: "Id não existente" });
  }

  return res.status(200).json(professor.turmas);
};

// GET /professores/departamento/:departamento
export const listarProfessoresPorDepartamento = (req, res) => {
  const { departamento } = req.params;
  const resultado = professores.filter(
    (p) => p.departamento.toLowerCase() === departamento.toLowerCase()
  );

  return res.status(200).json(resultado);
};

// PUT /professores/:id
export const atualizarProfessor = (req, res) => {
  const id = Number(req.params.id);
  const index = professores.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({ mensagem: "Id não existente" });
  }

  const { nome, idade, departamento, turmas } = req.body;

  professores[index] = {
    ...professores[index],
    nome: nome !== undefined ? nome : professores[index].nome,
    idade: idade !== undefined ? idade : professores[index].idade,
    departamento: departamento !== undefined ? departamento : professores[index].departamento,
    turmas: turmas !== undefined ? turmas : professores[index].turmas
  };

  return res.status(200).json(professores[index]);
};

// POST /professores/:id/turmas
export const adicionarTurma = (req, res) => {
  const id = Number(req.params.id);
  const professor = professores.find((p) => p.id === id);

  if (!professor) {
    return res.status(404).json({ mensagem: "Id não existente" });
  }

  const { codigo, disciplina, alunos } = req.body;

  if (!codigo || !disciplina || !Array.isArray(alunos)) {
    return res.status(400).json({ mensagem: "Dados da turma inválidos" });
  }

  const novaTurma = { codigo, disciplina, alunos };
  professor.turmas.push(novaTurma);

  return res.status(201).json(professor);
};

// DELETE /professores/:id
export const removerProfessor = (req, res) => {
  const id = Number(req.params.id);
  const index = professores.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({ mensagem: "Id não existente" });
  }

  professores.splice(index, 1);
  return res.status(200).json({ mensagem: "Professor removido com sucesso" });
};