import { Router } from "express";
import {
  listarProfessores,
  buscarProfessorPorId,
  listarTurmasPorProfessor,
  listarProfessoresPorDepartamento,
  atualizarProfessor,
  adicionarTurma,
  removerProfessor
} from "../controllers/professorController.js";

const router = Router();

// Rota específica de departamento deve ser declarada ANTES das rotas com :id
router.get("/departamento/:departamento", listarProfessoresPorDepartamento);

router.get("/", listarProfessores);
router.get("/:id", buscarProfessorPorId);
router.get("/:id/turmas", listarTurmasPorProfessor);

router.put("/:id", atualizarProfessor);
router.post("/:id/turmas", adicionarTurma);
router.delete("/:id", removerProfessor);

export default router;