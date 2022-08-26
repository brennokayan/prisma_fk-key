import express from "express";
import { connect } from "http2";
import { json } from "stream/consumers";
import { prisma } from "./prisma";
export const routes = express.Router();

routes.post("/alunoCad", async(req, res) => {
    const {
        nome,
        email
    } = req.body
    const CadAluno = await prisma.aluno.create({
        data: {
            nome: nome,
            email: email,
        }
    });
    return res.status(201).json({ data: CadAluno});
});

routes.get("/alunoGet", async (req, res) => {
    const {
        create_at
    } = req.body;
    const GetAluno = await prisma.aluno.findMany({
        orderBy: {
            create_at: create_at
        }
    })
    return res.status(200).json({data: {GetAluno}});
});


routes.post("/matriculaCad", async (req, res) =>{
    const {
        alunoId,
        cursoId,
        universidadeId,
    } = req.body;

    
    const matriculaCad = await prisma.matricula.create({
        data: {
            aluno: {
                connect: {
                    id: alunoId,
                }
            },
            curso: {
                connect: {
                    id: cursoId
                }
            },
            universidade: {
                connect: {
                    id: universidadeId
                }
            },
        }
    })

})

routes.get("/matriculaGet", async (req, res) =>{
    const GetMatricula = await prisma.matricula.findMany({

    })
    return res.status(200).json({data: {GetMatricula}})
})
//065999241548